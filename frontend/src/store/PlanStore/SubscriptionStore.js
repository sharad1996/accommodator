import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const PLAN_LOADING='plan_loading';
const PLAN_SUCCESS='plan_success';
const PLAN_FAIL='plan_fail';

export const subscriptionAction = (args='') => async (dispatch) => {
  try {
    dispatch({
      type: PLAN_LOADING,
    });
    const finalUrl = `${API_PATHS.planDetail}?${args}`
    const response = await requestToAPI({}, finalUrl, 'GET');
    dispatch({
      type: PLAN_SUCCESS,
      payload: response,
    });
  } catch(err){
    dispatch({
      type: PLAN_FAIL,
    });
  }
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  fail: false,
  responseData: [],
};
export const subscriptionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAN_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: [],
      };

    case PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
      };
    case PLAN_FAIL:
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


