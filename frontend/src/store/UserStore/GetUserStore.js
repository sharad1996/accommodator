import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const GET_USER_LOADING = 'get_user_loading';
const GET_USER_SUCCESS = 'get_user_success';
const GET_USER_FAIL = 'get_user_fail';
const GET_USER_RESET = 'get_user_reset';

export const getUserAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_LOADING,
    });
    const response = await requestToAPI({}, API_PATHS.getUser, 'POST');
    dispatch({
      type: GET_USER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_USER_FAIL,
    });
  }
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  fail: false,
  responseData: null,
};

export const getUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        fail: true,
        responseData: null,
      };
    case GET_USER_RESET:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
