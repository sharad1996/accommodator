import createError from "http-errors";
import Joi from "joi";
import UserService from "../service/UserService";
import Validator from "../validator";

export default class UserController {
  static async register(req, res, next) {
    try {
      const { error, value } = Joi.validate(req.body, Validator.register);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }
      const userService = new UserService();
      const responseData = await userService.saveUser(value);
      sendResponse(res, responseData);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { error, value } = Joi.validate(req.body, Validator.updateUser);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }
      if (req.params.uuid) {
        value.uuid = req.params.uuid;
      } else {
        value.uuid = req.user.uuid;
      }

      const userService = new UserService();
      const responseData = await userService.updateUser(value);
      sendResponse(res, responseData);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      const userService = new UserService();
      const responseData = await userService.getUser({
        uuid: req.context.uuid
      });
      sendResponse(res, responseData);
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const userService = new UserService();
      const responseData = await userService.getUsers({
        uuid: req.context.uuid
      });
      sendResponse(res, responseData);
    } catch (error) {
      next(error);
    }
  }

  static async addUserFromPanel(req, res, next) {
    try {
      const { error, value } = Joi.validate(
        req.body,
        Validator.addUserFromPanel
      );
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      if (Validator.emailDomain(value.email)) {
        throw createError.BadRequest("Email must be a valid domain.");
      }

      const userService = new UserService();
      const responseData = await userService.addUserFromPanel(value);
      sendResponse(res, responseData);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserFromPanel(req, res, next) {
    try {
      const { error, value } = Joi.validate(req.params, Validator.deleteUser);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const userService = new UserService();
      const responseData = await userService.deleteUserFromPanel(value);
      sendResponse(res, responseData);
    } catch (error) {
      next(error);
    }
  }
}
