import { combineReducers } from 'redux';
import { getUserReducer } from './GetUserStore';
import { updateUserReducer } from './UpdateUserStore';

export default combineReducers({
  getUserReducer,
  updateUserReducer,
});
