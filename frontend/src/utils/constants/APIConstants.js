// export const API_BASE_URL = 'https://houzzleads.herokuapp.com';
export const API_BASE_URL = 'http://192.168.1.16:3030';
export const API_PATHS = {
  mapSearch: '/leads/get-leads',
  exportCheck: '/leads/download-leads',
  zipCode: '/leads/get-zip-code',
  userLogin: '/auth/login',
  userRegister: '/user/register',
  activateUser: '/auth/activate',
  resetPassword: '/auth/reset-password',
  sendUserActivationEmail: '/auth/resend-activation',
  sendForgotPasswordEmail: '/auth/forgot-password',
  getProduct: '/products',
  checkout: '/subscription/checkout',
  paymentDetail: '/subscription/get-payment-detail',
  planDetail: '/subscription',
  user: '/user',
};
export const COMMON_ERROR_MSG = {
  unexpected: 'Some error occurred! Please try again.',
};
//https://houzzleads.herokuapp.com
