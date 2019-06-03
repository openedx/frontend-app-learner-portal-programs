import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';


import apiClient from './apiClient';
import history from './history';
import reducers from './reducers';

const loggerMiddleware = createLogger();
const routerHistoryMiddleware = routerMiddleware(history);

const middleware = [thunkMiddleware, loggerMiddleware, routerHistoryMiddleware];

const initialState = apiClient.getAuthenticationState();

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
