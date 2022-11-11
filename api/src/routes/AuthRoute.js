import AuthenticationController from '../controllers/AuthenticationController';

module.exports = router => {
  router.post('/login', AuthenticationController.login);
  router.post('/activate', AuthenticationController.activateUser);
  router.post('/resend-activation', AuthenticationController.resendActivation);
  router.post('/forgot-password', AuthenticationController.sendForgotPasswordMail);
  router.post('/reset-password', AuthenticationController.resetPassword);
};
