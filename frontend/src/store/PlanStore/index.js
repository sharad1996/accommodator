import { combineReducers } from 'redux';
import { productReducer } from './ProductStore';
import {subscriptionReducer} from './SubscriptionStore';
export default combineReducers({
  productReducer,subscriptionReducer
});
