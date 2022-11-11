import { API_PATHS } from '../../utils/constants/APIConstants';
import { requestToAPI } from '../../utils/helpers/APIHelper';

const UPDATE_USER_LOADING = 'update_user_loading';
const UPDATE_USER_SUCCESS = 'update_user_success';
const UPDATE_USER_FAIL = 'update_user_fail';
const UPDATE_USER_RESET = 'update_user_reset';

export const updateUserAction = args => async (dispatch, getState) => {
  try {
    if (args.reset) {
      dispatch({
        type: UPDATE_USER_RESET,
      });
    } else {
      dispatch({
        type: UPDATE_USER_LOADING,
      });

      const createUpdateQuery = {
        firstName: args.firstName,
        lastName: args.lastName,
        profileImg: args.profileImg,
        phoneNumber: args.phoneNumber,
        address: args.address,
        dob: args.dob,
      };

      if (args.email) {
        createUpdateQuery.email = args.email;
      }

      if (args.password) {
        createUpdateQuery.password = args.password;
      }

      let apiPath = API_PATHS.user;
      if (args.uuid) {
        apiPath = `${apiPath}/${args.uuid}`;
      }

      const response = await requestToAPI(createUpdateQuery, apiPath, 'PUT');
      localStorage.setItem('userDetails',JSON.stringify(response.data));
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:error
    });
  }
};

const INITIAL_STATE = {
  loading: false,
  success: false,
  fail: false,
  responseData: null,
};

export const updateUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
        responseData: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        fail: false,
        responseData: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        fail: true,
        responseData: null,
      };
    case UPDATE_USER_RESET:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
