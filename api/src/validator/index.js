import Joi from "joi";

export default {
  /**
   * User Login validation
   */

  login: Joi.object().keys({
    email: Joi.string()
      .max(255)
      .required(),
    password: Joi.string().required()
  }),

  updateUser: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string()
      .email()
      .max(255),
    password: Joi.string().min(6),
    currentPassword: Joi.string(),
    phoneNumber: Joi.number()
      .min(100000000)
      .max(999999999)
      .allow(''),
    address: Joi.string().allow(''),
    dob: Joi.string().allow('')
  }),
  /**
   * User Register Validation
   */
  register: Joi.object().keys({
    email: Joi.string()
      .email()
      .max(255)
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    firstName: Joi.string()
      .max(255)
      .required(),
      lastName:Joi.string()
      .max(255)
      .required(),
    confirmPassword: Joi.string()
      .min(6)
      .required(),
      terms:Joi.boolean()
      .required(),
  }),



  /**
   * Account Activation
   */
  activateUser: Joi.object().keys({
    activationKey: Joi.string().required()
  }),

  /**
   * Resend Activation mail validation
   */

  resendActivation: Joi.object().keys({
    email: Joi.string()
      .max(255)
      .required()
  }),

  /**
   * User Login validation
   */
  sendForgotPasswordMail: Joi.object().keys({
    email: Joi.string()
      .max(255)
      .required()
  }),

  /**
   * Reset Password
   */
  resetPassword: Joi.object().keys({
    resetPasswordKey: Joi.string().required(),
    password: Joi.string()
      .min(6)
      .required()
  }),
  checkout: Joi.object().keys({
    stripe_token: Joi.string(),
    product_id: Joi.number().required()
  }),
};
