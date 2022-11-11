import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const USER_LOGIN_LOADING = 'user_login_loading';
const USER_LOGIN_SUCCESS = 'user_login_success';
const USER_LOGIN_FAIL = 'user_login_fail';
const USER_LOGIN_RESET = 'user_login_reset';

export const userLoginAction = (args, history,error) => async (dispatch, getState) => {
  try {
    if (args.reset) {
      dispatch({
        type: USER_LOGIN_RESET,
      });
    } else {
      dispatch({
        type: USER_LOGIN_LOADING,
      });
      const apiRequestBody = { email: args.email, password: args.password };
      const response = await requestToAPI(apiRequestBody, API_PATHS.userLogin, 'POST');

      if (response && !response.error) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userDetails',JSON.stringify(response.data.userData))
        history.replace('/profile');
      }

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
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

export const userLoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: null,
        error:null
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
        error:null
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        fail: true,
        responseData: null,
        error:action.payload
      };
    case USER_LOGIN_RESET:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
