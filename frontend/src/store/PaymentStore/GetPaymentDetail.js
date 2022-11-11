import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const PAY_DETAIL_LOADING = 'pay_detail_loading';
const PAY_DETAIL_SUCCESS = 'pay_detail_success';
const PAY_DETAIL_FAIL = 'pay_detail_fail';

export const payDetailAction = args => async (dispatch) => {
  try {
    dispatch({
      type: PAY_DETAIL_LOADING,
    });
    const response = await requestToAPI({}, API_PATHS.paymentDetail, 'GET');
    dispatch({
      type: PAY_DETAIL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: PAY_DETAIL_FAIL,
    });
  }
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  fail: false,
  responseData: [],
};

export const payDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAY_DETAIL_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: [],
      };

    case PAY_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
      };
    case PAY_DETAIL_FAIL:
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
