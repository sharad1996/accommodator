import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';
const ZIP_CODE_LOADING = 'zip_code_loading';
const ZIP_CODE_SUCCESS = 'zip_code_success';
const ZIP_CODE_FAIL = 'zip_code_fail';


export const zipCodeAction = args => async (dispatch, getState) => {
  try {
    dispatch({
      type: ZIP_CODE_LOADING,
    });
    const response = await requestToAPI( {},API_PATHS.zipCode, 'GET');
    dispatch({
      type: ZIP_CODE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: ZIP_CODE_FAIL,
    });
  }
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  fail: false,
  responseData: null,
};

export const zipCodeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ZIP_CODE_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: null,
      };

    case ZIP_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
      };
    case ZIP_CODE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        fail: true,
        responseData: null,
      };

    default:
      return state;
  }
};
