import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const REGISTER_LOADING = 'register_loading';
const REGISTER_SUCCESS = 'register_success';
const REGISTER_FAIL = 'register_fail';
const REGISTER_RESET = 'register_reset';

export const userRegisterAction = args => async (dispatch, getState) => {
  try {
    if (args.reset) {
      dispatch({
        type: REGISTER_RESET,
      });
    } else {
      dispatch({
        type: REGISTER_LOADING,
      });
      // const apiRequestBody = { firstName: args.name, email: args.email, password: args.password };
      const response = await requestToAPI(args, API_PATHS.userRegister, 'POST');
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
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

export const userRegisterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: null,
        error:null
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
        error:null
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        fail: true,
        responseData: null,
        error:action.payload
      };
    case REGISTER_RESET:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
