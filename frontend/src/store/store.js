import { combineReducers } from 'redux';
import authReducer from './AuthStore';
import userReducer from './UserStore';
import mapReducer from './LeadsStore';
import payReducer from './PaymentStore';
import planReducer from './PlanStore';

export default combineReducers({
  authReducer,
  mapReducer,
  userReducer,
  payReducer,
  planReducer
});
