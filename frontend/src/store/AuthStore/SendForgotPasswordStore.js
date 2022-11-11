import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const SEND_FORGOT_PASSWORD_LOADING = 'send_forgot_password_loading';
const SEND_FORGOT_PASSWORD_SUCCESS = 'send_forgot_password_success';
const SEND_FORGOT_PASSWORD_FAIL = 'send_forgot_password_fail';
const SEND_FORGOT_PASSWORD_RESET = 'send_forgot_password_reset';

export const sendForgotPasswordAction = args => async (dispatch, getState) => {
  try {
    if (args.reset) {
      dispatch({
        type: SEND_FORGOT_PASSWORD_RESET,
      });
    } else {
      dispatch({
        type: SEND_FORGOT_PASSWORD_LOADING,
      });
      const apiRequestBody = { email: args.email };
      const response = await requestToAPI(apiRequestBody, API_PATHS.sendForgotPasswordEmail, 'POST');
      dispatch({
        type: SEND_FORGOT_PASSWORD_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: SEND_FORGOT_PASSWORD_FAIL,
      payload:error
    });
  }
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  fail: false,
  responseData: null,
  error:null
};

export const sendForgotPasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: null,
        error:null
      };
    case SEND_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
        error:null
      };
    case SEND_FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        fail: true,
        responseData: null,
        error:action.payload
      };
    case SEND_FORGOT_PASSWORD_RESET:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
