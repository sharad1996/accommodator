import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const MAP_SEARCH_LOADING = 'map_search_loading';
const MAP_SEARCH_SUCCESS = 'map_search_success';
const MAP_SEARCH_FAIL = 'map_search_fail';



export const mapSearchAction = args => async (dispatch) => {
  try {
    dispatch({
      type: MAP_SEARCH_LOADING,
    });
    const apiRequestBody = args;
    const response = await requestToAPI(apiRequestBody, API_PATHS.mapSearch, 'POST');
    dispatch({
      type: MAP_SEARCH_SUCCESS,
      payload: response,
      args:apiRequestBody
    });
  } catch (error) {
    dispatch({
      type: MAP_SEARCH_FAIL,
      payload:error
    });
  }
};
export const resetMapData = ()=> dispatch=>{
  dispatch({
      type: MAP_SEARCH_SUCCESS,
      //  payload: [],
      // responseData:[],
      //  args:null
    });
}

const INITIAL_STATE = {
  searching: false,
  success: false,
  fail: false,
  responseData: [],
  mapArgs:null,
  error:null
};

export const mapSearchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAP_SEARCH_LOADING:
        console.log('in processs');
      return {
        ...state,
        searching: true,
        success: false,
        fail: false,
        responseData: [],
        mapArgs:null,
        error:null
      };

    case MAP_SEARCH_SUCCESS:
      return {
        ...state,
        searching: false,
        success: true,
        fail: false,
        mapArgs:action.args,
        responseData: action.payload,
        error:null
      };
    case MAP_SEARCH_FAIL:
      return {
        ...state,
        searching: false,
        success: false,
        fail: true,
        responseData: [],
        mapArgs:null,
        error:action.payload
      };
  
    default:
      return state;
  }
};
