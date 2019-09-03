import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { profileSaga } from '@edx/frontend-app-profile';

import { configuration } from '../environment';

import apiClient from './apiClient';
import history from './history';
import rootReducer from './rootReducer';

const loggerMiddleware = createLogger();
const routerHistoryMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middleware = [thunkMiddleware, sagaMiddleware, loggerMiddleware, routerHistoryMiddleware];

const initialState = {
  configuration,
  ...apiClient.getAuthenticationState(),
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

sagaMiddleware.run(profileSaga);

export default store;
