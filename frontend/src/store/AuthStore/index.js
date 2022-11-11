import { combineReducers } from 'redux';
import { resetPasswordReducer } from './ResetPasswordStore';
import { sendForgotPasswordReducer } from './SendForgotPasswordStore';
import { sendUserActivationReducer } from './SendUserActivationStore';
import { userActivationReducer } from './UserActivationStore';
import { userLoginReducer } from './UserLoginStore';
import { userRegisterReducer } from './UserRegisterStore';

export default combineReducers({
  userLoginReducer,
  userRegisterReducer,
  resetPasswordReducer,
  userActivationReducer,
  sendUserActivationReducer,
  sendForgotPasswordReducer,
});
