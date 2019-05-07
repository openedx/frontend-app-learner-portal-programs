import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import apiClient from './apiClient';
import history from './history';
import reducers from './reducers';
import rootSaga from '../components/profile/sagas';
import { configuration } from '../components/profile/environment';
import { configureProfileApiService } from '../components/profile/profile';
import { configureUserAccountApiService } from '../components/profile/common';

const loggerMiddleware = createLogger();
const routerHistoryMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const createStore = () => {
  const middleware = [
    thunkMiddleware,
    loggerMiddleware,
    routerHistoryMiddleware,
    sagaMiddleware,
  ];
  const initialState = apiClient.getAuthenticationState();
  configureProfileApiService(configuration, apiClient);
  configureUserAccountApiService(configuration, apiClient);
  const store = reduxCreateStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createStore;
