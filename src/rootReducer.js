import { combineReducers } from 'redux';
import { reducer as courseEnrollments } from './components/course-enrollments';

import { reducer as enrolledPrograms } from './components/user-program-enrollments';

const identityReducer = (state) => {
  const newState = { ...state };
  return newState;
};

const rootReducer = combineReducers({
  enrolledPrograms,
  courseEnrollments,
});

export default rootReducer;
