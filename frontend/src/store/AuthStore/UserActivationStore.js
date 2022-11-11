import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const USER_ACTIVATION_LOADING = 'user_activation_loading';
const USER_ACTIVATION_SUCCESS = 'user_activation_success';
const USER_ACTIVATION_FAIL = 'user_activation_fail';
const USER_ACTIVATION_RESET = 'user_activation_reset';

export const userActivationAction = args => async (dispatch, getState) => {
  if (args.reset) {
    dispatch({
      type: USER_ACTIVATION_RESET,
    });
  } else {
    try {
      dispatch({
        type: USER_ACTIVATION_LOADING,
      });
      const apiRequestBody = { activationKey: args.key };
      const response = await requestToAPI(apiRequestBody, API_PATHS.activateUser, 'POST');
      dispatch({
        type: USER_ACTIVATION_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: USER_ACTIVATION_FAIL,
        payload:error
      });
    }
  }
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  fail: false,
  responseData: null,
  error:null
};

export const userActivationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_ACTIVATION_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: null,
        error:null
      };
    case USER_ACTIVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
        error:null
      };
    case USER_ACTIVATION_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        fail: true,
        responseData: null,
        error:action.payload
      };
    case USER_ACTIVATION_RESET:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
