import SubscriptionController from '../controllers/SubscriptionController';
import isAuth from '../middleware/isAuth';
module.exports = router => {
  router.post('/checkout',isAuth, SubscriptionController.checkout);
  router.get('/get-payment-detail',isAuth, SubscriptionController.getStripeCustomer);
  router.get('/',isAuth, SubscriptionController.getSubscription);
};
