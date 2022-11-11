import { combineReducers } from 'redux';
import { mapSearchReducer } from './MapStore.js';
import { zipCodeReducer } from './ZipCode';
import { exportReducer } from './Export';
export default combineReducers({
  mapSearchReducer,zipCodeReducer,exportReducer
});