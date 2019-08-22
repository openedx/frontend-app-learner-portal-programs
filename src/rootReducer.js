import { combineReducers } from 'redux';
import { userAccount } from '@edx/frontend-auth';

import { reducer as enrolledPrograms } from './components/masters/user-program-enrollments';
import { reducer as courseEnrollments } from './components/common/course-enrollments';
import { reducer as emailSettings } from './components/common/course-enrollments/course-cards/email-settings';

const identityReducer = (state) => {
  const newState = { ...state };
  return newState;
};

const rootReducer = combineReducers({
  // The authentication state is added as initialState when
  // creating the store in store.js.
  authentication: identityReducer,
  userAccount,
  emailSettings,
  enrolledPrograms,
  courseEnrollments,
});

export default rootReducer;
