import { combineReducers } from 'redux';
import { paymentReducer } from './CheckoutStore';
import {payDetailReducer} from './GetPaymentDetail';
export default combineReducers({
    paymentReducer,payDetailReducer
});