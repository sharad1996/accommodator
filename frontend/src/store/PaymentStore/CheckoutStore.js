import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const PAYMENT_LOADING = 'payment_loading';
const PAYMENT_SUCCESS = 'payment_success';
const PAYMENT_FAIL = 'payment_fail';

export const paymentAction = args => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_LOADING,
    });
    const response = await requestToAPI(args, API_PATHS.checkout, 'POST');
    dispatch({
      type: PAYMENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_FAIL,
    });
  }
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  fail: false,
  responseData: [],
};

export const paymentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAYMENT_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: [],
      };

    case PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
      };
    case PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        fail: true,
        responseData: [],
      };

    default:
      return state;
  }
};
