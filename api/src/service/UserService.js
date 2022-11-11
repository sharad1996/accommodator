import createError from "http-errors";
import UserRepository from "../repositories/UserRepository";
import Hash from "../utils/helpers/Hash";
import Mailer from "../utils/helpers/Mailer";

/**
 * @export
 * @class UserService
 */
export default class UserService {
  constructor() {
    this.userRepo = new UserRepository();
  }

  /**
   * @method saveUser
   * @param {*} args
   * @returns
   * @memberof UserService
   */
  async saveUser(args) {
    const { password, email,firstName,lastName } = args;
    const checkIfUserExist = await this.userRepo.findOne({ email });
    if (checkIfUserExist) {
      throw createError.Conflict("Email id already exist!");
    }

    const hashedPassword = Hash.generatePasswordHash(password);
    const newUser = await this.userRepo.save({
      email,
      password: hashedPassword,
      meta: {
        isActivated: false
      },
      firstName,
      lastName
    });

    const { uuid,stripe_customer_id } = newUser;
    const token = Hash.generateToken(
      {userDetails: newUser },
      process.appConfig.activationTokenExpTime
    );
    const activationKey = Hash.encrypt(token);
    const activationLink = `${process.appConfig.webURL}/activate-account#key=${activationKey}`;

    const mailData = {
      email,
      uuid,
      activationLink
    };

    const mailer = new Mailer();
    mailer.sendRegistrationMail(email, mailData);

    return global.buildResponseData({
      data: {
        email,
        uuid
      },
      message:
        "Successfully Registered! An activation email has been sent to your email address. Please check your inbox"
    });
  }

  async updateUser(args) {

    try {
      const { uuid } = args;
      const dataTupUpdate = { ...args };
      if (args.password) {
        const hashedPassword = Hash.generatePasswordHash(args.password);
        dataTupUpdate.password = hashedPassword;
      }
      dataTupUpdate.updatedAt = Date.now();
      await this.userRepo.update({ ...dataTupUpdate }, { uuid });
      const updatedData = await this.userRepo.findOne({ uuid });
      return global.buildResponseData({
        data: {
          firstName: updatedData.get("firstName"),
          lastName: updatedData.get("lastName"),
          email: updatedData.get("email"),
          stripeCustomerId: updatedData.get("stripe_customer_id"),
          createdAt:updatedData.get("createdAt")
        },
        message: "Successfully Updated!"
      });
    } catch(err) {
      console.log(err);
    }
  }

  async getUser(args) {
    const { uuid } = args;
    const userData = await this.userRepo.findOne({ uuid });
    return global.buildResponseData({
      data: userData.dataValues,
      message: ""
    });
  }

  async getUsers(args) {
    const userData = await this.userRepo.findAll(args);
    return global.buildResponseData({
      data: userData,
      message: ""
    });
  }

  async addUserFromPanel(args) {
    const { email } = args;
    const checkIfUserExist = await this.userRepo.findOne({ email });
    if (checkIfUserExist) {
      throw createError.Conflict("Email id already exist!");
    }

    const hashedPassword = Hash.generatePasswordHash(email);
    // eslint-disable-next-line no-unused-vars
    const newUser = await this.userRepo.save({
      ...args,
      password: hashedPassword,
      meta: {
        department: args.department,
        phoneNumber: args.phoneNumber
      }
    });

    // const { uuid } = newUser;
    // const token = Hash.generateToken({ email, uuid }, process.appConfig.activationTokenExpTime);
    // const activationKey = Hash.encrypt(token);
    // const activationLink = `${process.appConfig.webURL}/activate-account#key=${activationKey}`;

    // const mailData = {
    //   email,
    //   uuid,
    //   activationLink,
    // };

    // const mailer = new Mailer();
    // mailer.sendRegistrationMail(email, mailData);

    return global.buildResponseData({
      data: {},
      message: "User added Successfully"
    });
  }

  async deleteUserFromPanel(args) {
    const checkIfUserExist = await this.userRepo.findOne({ uuid: args.uuid });
    if (!checkIfUserExist) {
      throw createError.BadRequest("Some error occurred, Please try again");
    }

    this.userRepo.update(
      { isDeleted: true, updatedAt: Date.now() },
      { uuid: args.uuid }
    );

    return global.buildResponseData({
      data: {},
      message: "User Deleted Successfully"
    });
  }
}
