import Joi from 'joi';
import createError from 'http-errors';
import Validator from '../validator';
import AuthenticationService from '../service/AuthenticationService';

export default class AuthenticationController {
  static async login(req, res, next) {
    try {
      const { error, value } = Joi.validate(req.body, Validator.login);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const loginData = await new AuthenticationService().login(value);
      sendResponse(res, loginData);
    } catch (error) {
      next(error);
    }
  }

  static async activateUser(req, res, next) {
    try {
      const { error, value } = Joi.validate(req.body, Validator.activateUser);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const activationData = await new AuthenticationService().activateUser(value);
      sendResponse(res, activationData);
    } catch (error) {
      next(error);
    }
  }

  static async resendActivation(req, res, next) {
    try {
      const { error, value } = Joi.validate(req.body, Validator.resendActivation);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const resendActivation = await new AuthenticationService().resendActivation(value);
      sendResponse(res, resendActivation);
    } catch (error) {
      next(error);
    }
  }

  static async sendForgotPasswordMail(req, res, next) {
    try {
      const { error, value } = Joi.validate(req.body, Validator.sendForgotPasswordMail);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const responseData = await new AuthenticationService().sendForgotPasswordMail(value);
      sendResponse(res, responseData);
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { error, value } = Joi.validate(req.body, Validator.resetPassword);

      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const responseData = await new AuthenticationService().resetPassword(value);
      sendResponse(res, responseData);
    } catch (error) {
      next(error);
    }
  }
}
