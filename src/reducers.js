import { combineReducers } from 'redux';
import { userAccount } from '@edx/frontend-auth';

import { reducer as emailSettingsReducer } from './components/masters/program/main-content/course-cards/email-settings';
import { reducer as programCourseEnrollments } from './components/masters/program/main-content';

const identityReducer = (state) => {
  const newState = { ...state };
  return newState;
};

const rootReducer = combineReducers({
  // The authentication state is added as initialState when
  // creating the store in store.js.
  authentication: identityReducer,
  userAccount,
  programCourseEnrollments,
  emailSettingsReducer,
});

export default rootReducer;