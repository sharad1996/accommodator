import createError from 'http-errors';
import UserRepository from '../repositories/UserRepository';
import Hash from '../utils/helpers/Hash';
import Mailer from '../utils/helpers/Mailer';
import _ from 'lodash';
/**
 * @export
 * @class AuthenticationService
 */
export default class AuthenticationService {
  constructor() {
    this.userRepo = new UserRepository();
  }

  /**
   * @method login
   * @param {*} args
   * @returns
   * @memberof AuthenticationService
   */
  async login(args) {
    const { email, password } = args;
    const userData = await this.userRepo.findOne({ email });
    if (!userData) {
      throw createError.Unauthorized('Email or Password is not correct!');
    }

    const meta = userData.get('meta');
    const { isActivated } = meta;

    if (!isActivated) {
      throw createError.Unauthorized('You account is not activated!');
    }

    const hashedPassword = Hash.generatePasswordHash(password);
    if (hashedPassword !== userData.password) {
      throw createError.Unauthorized('Email or Password is not correct!');
    }

    const accessToken = Hash.generateToken(
      { userDetails:userData },
      process.appConfig.loginTokenExpTime,
    );
    const userPickedData = _.pick(userData,['uuid','firstName','lastName','email','stripe_customer_id','createdAt']);
    return buildResponseData({
      data: {
        uuid: userData.get('uuid'),
        userData:userPickedData,
        accessToken,
      },
    });
  }

  /**
   * @method activateUser
   * @param {*} args
   * @returns
   * @memberof AuthenticationService
   */
  async activateUser(args) {
    const { activationKey } = args;
    let tokenData = {};

    try {
      const decryptedToken = Hash.decrypt(activationKey);
      tokenData = Hash.verifyToken(decryptedToken);
    } catch (error) {
      throw createError.Unauthorized(
        'Your activation key is expired/bad! Enter your email and send activation email again.',
      );
    }
    const { uuid } = tokenData.userDetails;
    const userData = await this.userRepo.findOne({ uuid });
    if (userData === null) {
      throw createError.Unauthorized(
        'Your activation key is expired/bad! Enter your email and send activation email again.',
      );
    }
    const meta = userData.get('meta');
    const { isActivated } = meta;

    if (isActivated) {
      return buildResponseData({
        statusCode: 208,
        message: 'Your account is already activated! Please go to login page.',
      });
    }

    meta.isActivated = true;
    await this.userRepo.update({ meta }, { uuid });

    return buildResponseData({ message: 'Account activated successfully! Please go to login page.' });
  }

  /**
   * @method resendActivation
   * @param {*} args
   * @memberof AuthenticationService
   */
  async resendActivation(args) {
    const { email } = args;
    const userData = await this.userRepo.findOne({ email });
    if (!userData) {
      throw createError.NotFound('Email Id does not exits! Please go to Sign Up page for register.');
    }
    const { uuid, meta } = userData;
    const { isActivated } = meta;

    if (isActivated) {
      return buildResponseData({
        statusCode: 208,
        message: 'Your account is already activated! Please go to login page.',
      });
    }

    const token = Hash.generateToken({ userDetails: userData}, process.appConfig.activationTokenExpTime);
    const activationKey = Hash.encrypt(token);
    const activationLink = `${process.appConfig.webURL}/activate-account#key=${activationKey}`;

    const mailData = {
      email,
      uuid,
      activationLink,
    };

    const mailer = new Mailer();
    mailer.activationMail(email, mailData);

    return global.buildResponseData({
      message: 'An activation email has been sent to your email address. Please check your inbox',
    });
  }

  /**
   * @method sendForgotPasswordMail
   * @param {*} args
   * @returns
   * @memberof AuthenticationService
   */
  async sendForgotPasswordMail(args) {
    const { email } = args;
    const userData = await this.userRepo.findOne({ email });
    if (!userData) {
      throw createError.NotFound('Email Id does not exits! Please go to Sign Up page for register.');
    }

    const token = Hash.generateToken({ userDetails: userData }, process.appConfig.resetPassTokenExpTime);
    const forgotPasswordKey = Hash.encrypt(token, 'forgot-password');
    const forgotPasswordLink = `${process.appConfig.webURL}/reset-password#key=${forgotPasswordKey}`;

    const mailData = {
      email,
      forgotPasswordLink,
    };

    const mailer = new Mailer();
    mailer.forgotPasswordMail(email, mailData);

    return global.buildResponseData({
      message: 'An reset link has been sent to your email address. Please check your inbox',
    });
  }

  /**
   * @method resetPassword
   * @param {*} args
   * @returns
   * @memberof AuthenticationService
   */
  async resetPassword(args) {
    const { resetPasswordKey, password } = args;
    let tokenData = {};

    try {
      const decryptedToken = Hash.decrypt(resetPasswordKey, 'forgot-password');
      tokenData = Hash.verifyToken(decryptedToken);
    } catch (error) {
      throw createError.Unauthorized('Your reset link expired/bad! Enter your email and send reset link again.');
    }

    const { uuid } = tokenData.userDetails;
    const hashedPassword = Hash.generatePasswordHash(password);
    await this.userRepo.update({ password: hashedPassword }, { uuid });

    return buildResponseData({ message: 'Password has been reset successfully! Please go to login page.' });
  }
}
