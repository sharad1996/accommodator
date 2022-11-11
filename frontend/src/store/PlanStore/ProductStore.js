import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const PRODUCT_LOADING = 'product_loading';
const PRODUCT_SUCCESS = 'product_success';
const PRODUCT_FAIL = 'product_fail';

export const productAction = (args = '') => async dispatch => {
  try {
    dispatch({
      type: PRODUCT_LOADING,
    });
    const finalUrl = `${API_PATHS.getProduct}?${args}`;
    const response = await requestToAPI({}, finalUrl, 'GET');
    dispatch({
      type: PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_FAIL,
    });
  }
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  fail: false,
  responseData: [],
};
export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: [],
      };

    case PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
      };
    case PRODUCT_FAIL:
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
