import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const RESET_PASSWORD_LOADING = 'reset_password_loading';
const RESET_PASSWORD_SUCCESS = 'reset_password_success';
const RESET_PASSWORD_FAIL = 'reset_password_fail';
const RESET_PASSWORD_RESET = 'reset_password_reset';

export const resetPasswordAction = args => async (dispatch, getState) => {
  try {
    if (args.reset) {
      dispatch({
        type: RESET_PASSWORD_RESET,
      });
    } else {
      dispatch({
        type: RESET_PASSWORD_LOADING,
      });
      const apiRequestBody = { resetPasswordKey: args.key, password: args.password };
      const response = await requestToAPI(apiRequestBody, API_PATHS.resetPassword, 'POST');
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
  }
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  fail: false,
  responseData: null,
};

export const resetPasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_PASSWORD_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        fail: true,
        responseData: null,
      };
    case RESET_PASSWORD_RESET:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
