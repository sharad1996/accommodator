import stripe from 'stripe';
import PaymentRepo from '../repositories/PaymentRepository';
export default class PaymentService {
  constructor() {
    this.stripeObj = stripe(process.env.STRIPE_SECRET_KEY);
  }
  /**
   * @method createStripeProductId
   * @param {*} args
   * @returns
   * @memberof PaymentService
   */

  async createStripeProductId() {
    const productInfo = {
      name: 'leads',
      type: 'service'
    }
    const stripeProductId = await this.stripeObj.products.create(productInfo);
    return stripeProductId;
  }

  async createStripePlan(product) {
    const planObj = {
      product: product.stripe_product_id,
      amount: Math.ceil((product.amount) * 100),
      currency: process.env.PAYMENT_CURRENCY,
      interval: (product.product_plan.dataValues.sub_plan).toLowerCase(),
      nickname: `${product.product_plan.dataValues.sub_plan}ly`,
      usage_type: 'licensed',
    }
    const stripePlanId = await this.stripeObj.plans.create(planObj);
    return stripePlanId;
  }

  async createStripeCustomer(user, token) {
    const createObject = {
      email: user.emails,
      source: token
    }
    const stripeCustomer = await this.stripeObj.customers.create(createObject);
    return stripeCustomer;
  }

  async createStripeSubscription(stripeCustomer, planId,subId) {
    try {
      const paymentRepo = new PaymentRepo();
      const subObj = {
        customer: stripeCustomer,
        items: [{
          plan: planId
        }]
      }
      const createObj = {
        subscription_id:subId,
        payment_request:subObj
      }
      const paymentId = await paymentRepo.save(createObj);
      const subscription = await this.stripeObj.subscriptions.create(subObj);
      const updateObject = {
        payment_response:subscription,
        payment_status:true
      }
      await paymentRepo.update(updateObject,{id:paymentId.dataValues.id})
      return subscription;

    } catch (err) {
      throw new Error(err.message);
    }
  }
  async getStripeCustomerDetails (stripeId) {
    try {
      const stripeData =  await this.stripeObj.customers.retrieve(stripeId);
      const {sources} = stripeData;
      return buildResponseData({
        data:sources.data,
        message:'success'
      })
    } catch(err) {
      throw new Error(err.message);
    }
  }
}
