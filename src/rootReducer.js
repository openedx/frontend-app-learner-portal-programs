import { combineReducers } from 'redux';
import { userAccount } from '@edx/frontend-auth';
import { reducer as courseEnrollments } from '@edx/frontend-learner-portal-base/src/components/course-enrollments';
import { reducer as emailSettings } from '@edx/frontend-learner-portal-base/src/components/course-enrollments/course-cards/email-settings';

import { reducer as enrolledPrograms } from './components/user-program-enrollments';

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
