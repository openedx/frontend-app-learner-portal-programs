import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { userAccount } from '@edx/frontend-auth';
import { profileReducer } from '../../profile/profile';

const identityReducer = (state) => {
  const newState = { ...state };
  return newState;
};

const rootReducer = combineReducers({
  // The authentication state is added as initialState when
  // creating the store in data/store.js.
  authentication: identityReducer,
  configuration: identityReducer,
  userAccount,
  profilePage: profileReducer,
  routerReducer,
});

export default rootReducer;
