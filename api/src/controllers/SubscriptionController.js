import Joi from 'joi';
import PaymentService from '../service/PaymentService';
import SubscriptionService from '../service/SubscriptionService';
import Validator from '../validator';
export default class SubscriptionController {
  static async checkout(req, res, next) {
    try {
      const {
        error,
        value
      } = Joi.validate(req.body, Validator.checkout);
      if (error) {
        throw new Error(error.details[0].message);
      }
      const subObj = new SubscriptionService();
      const {
        user
      } = req;
      const subData = await subObj.checkout(user, value);
      sendResponse(res, subData);
    } catch (err) {
      next(err);
    }
  }
  static async getStripeCustomer(req, res, next) {
    try {
      const paymentObj = new PaymentService();
      const {
        user
      } = req;
      if (user.stripe_customer_id === null) {
        throw new Error('Invalid stripe customer id');
      }
      const stripeCustomerDetail = await paymentObj.getStripeCustomerDetails(user.stripe_customer_id);
      sendResponse(res, stripeCustomerDetail);
    } catch (err) {
      next(err);
    }
  }
  static async getSubscription(req, res, next) {
    try {
      const {
        user
      } = req;
      const subObj = new SubscriptionService();
      const subscriptionData = await subObj.getUserSubscription(user);
      sendResponse(res, subscriptionData);

    } catch (err) {
      next(err);
    }
  }
}
