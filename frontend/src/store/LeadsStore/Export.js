import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const EXPORT_LOADING = 'export_loading';
const EXPORT_SUCCESS = 'export_success';
const EXPORT_FAIL = 'export_fail';


export const exportAction = args => async (dispatch) => {
  try {
    dispatch({
      type: EXPORT_LOADING,
    });
    const response = await requestToAPI(args, API_PATHS.exportCheck, 'POST');
    window.location.assign(response.data);
    dispatch({
      type: EXPORT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: EXPORT_FAIL,
    });
  }
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  fail: false,
  responseData: [],
};

export const exportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EXPORT_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: [],
      };

    case EXPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
      };
    case EXPORT_FAIL:
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
