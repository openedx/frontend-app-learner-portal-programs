import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const identityReducer = (state) => {
  const newState = { ...state };
  return newState;
};

const rootReducer = combineReducers({
  // The authentication state is added as initialState when
  // creating the store in data/store.js.
  authentication: identityReducer,
  routerReducer,
});

export default rootReducer;
