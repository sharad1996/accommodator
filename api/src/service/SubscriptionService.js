import moment from 'moment';
import SubscriptionRepository from '../repositories/SubscriptionRepository';
import ProductRepository from '../repositories/ProductRepository';
import PaymentService from '../service/PaymentService';
import UserRepository from "../repositories/UserRepository";
import _ from 'lodash';
export default class SubscriptionService {
  constructor() {
    this.subscriptionRepo = new SubscriptionRepository();
    this.productRepo = new ProductRepository();
    this.paymentService = new PaymentService();
  }
  /**
   * @method getSubscription
   * @param {*} args
   * @returns
   * @memberof ProductService
   */

  async getSubscription(args) {
    const subscription = await this.subscriptionRepo.findAll(args);
    return buildResponseData({
      data: subscription,
      message: 'success'
    });
  }

  async checkout(user, value) {
    let stripeSubscriptionId
    try {
      const selectedProduct = await this.productRepo.findAll({
        product_detail_status: true,
        id: value.product_id
      });

      if (selectedProduct.length <= 0) {
        throw new Error('Invalid data');
      }
      const finalProduct = selectedProduct[0].dataValues;
      if (finalProduct.amount <= 0) {
        const userSubscription = await this.subscriptionRepo.findAll({
          users_id: user.uuid,
          product_id: value.product_id,
        });
        if (userSubscription.length > 0) {
          throw new Error('You already used trial product')
        }
      }
      const subscription = await this.subscriptionRepo.save({
        users_id: user.uuid,
        product_id: value.product_id
      });
      if (finalProduct.amount > 0 && finalProduct.stripe_product_id === null) {
        //creating stripe product
        const stripeProductId = await this.createStripeProduct();
        finalProduct.stripe_product_id = stripeProductId;
      }
      if (finalProduct.amount > 0 && finalProduct.stripe_plan_id === null) {
        //creating plan
        const stripePlanId = await this.createStripePlan(finalProduct);
        finalProduct.stripe_plan_id = stripePlanId;
      }
      if (finalProduct.amount > 0 && user.stripe_customer_id === null) {
        //creating stripe user
        const stripeCustomerId = await this.createStripeCustomer(user, value);
        user.stripe_customer_id = stripeCustomerId;
      }
      if (finalProduct.amount > 0) {
        stripeSubscriptionId = await this.paymentService.createStripeSubscription(user.stripe_customer_id, finalProduct.stripe_plan_id, subscription.get('id'));

      }
      const updateObject = {
        stripe_subscription_id: _.has(stripeSubscriptionId, 'id') ? stripeSubscriptionId.id : null,
        payment_status: true,
        auto_renew_status: true,
        subscription_status: true,
        expiry_date: moment().add(finalProduct.product_plan.dataValues.duration_per_day, 'days').format('YYYY-MM-DD HH:mm:ss')
      }
      await this.subscriptionRepo.update(updateObject, {
        id: subscription.get('id')
      })
      return buildResponseData({
        data: {
          subId: subscription.get('id'),
          expiryDate: updateObject.expiry_date
        },
        message: 'success'
      });

    } catch (err) {
      throw new Error(err);
    }
  }
  async createStripeProduct() {
    const stripePid = await this.paymentService.createStripeProductId();
    this.productRepo.update({
      stripe_product_id: stripePid.id
    }, {
      stripe_product_id: null
    });
    return stripePid.id;
  }

  async createStripePlan(product) {
    const stripePlanId = await this.paymentService.createStripePlan(product);
    await this.productRepo.update({
      stripe_plan_id: stripePlanId.id
    }, {
      id: product.id
    });
    return stripePlanId.id;
  }

  async createStripeCustomer(user, value) {
    const stripeCustomer = await this.paymentService.createStripeCustomer(user, value.stripe_token);
    const userRepo = new UserRepository();
    const dataTopUpdate = {
      stripe_customer_id: stripeCustomer.id
    }
    await userRepo.update(dataTopUpdate, {
      uuid: user.uuid
    });
    return stripeCustomer.id;
  }

  async getUserSubscription(args) {
    try {
      const {
        uuid
      } = args;
      const userSubscribeData = await this.subscriptionRepo.findAll({
        users_id: uuid
      });

      return buildResponseData({
        data: {
          subscriptionData: userSubscribeData,
          userData: args
        },
        message: 'success'
      })
    } catch (err) {
      throw new Error(err);
    }
  }

}
