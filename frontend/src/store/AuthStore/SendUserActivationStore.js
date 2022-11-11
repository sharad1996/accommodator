import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const SEND_ACTIVATION_LOADING = 'send_activation_loading';
const SEND_ACTIVATION_SUCCESS = 'send_activation_success';
const SEND_ACTIVATION_FAIL = 'send_activation_fail';
const SEND_ACTIVATION_RESET = 'send_activation_reset';

export const sendUserActivationAction = args => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEND_ACTIVATION_LOADING,
    });
    const apiRequestBody = { email: args.email };
    const response = await requestToAPI(apiRequestBody, API_PATHS.sendUserActivationEmail, 'POST');
    dispatch({
      type: SEND_ACTIVATION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: SEND_ACTIVATION_FAIL,
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

export const sendUserActivationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_ACTIVATION_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: null,
        error:null
      };
    case SEND_ACTIVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
        error:null
      };
    case SEND_ACTIVATION_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        fail: true,
        responseData: null,
        error:action.payload
      };
    case SEND_ACTIVATION_RESET:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
