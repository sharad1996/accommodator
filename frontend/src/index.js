import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppStore from './store/store';

let store = {};
if (process.env.NODE_ENV === 'development') {
  store = createStore(AppStore, composeWithDevTools(applyMiddleware(thunk)));
} else {
  store = createStore(AppStore, applyMiddleware(thunk));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);


serviceWorker.unregister();
