import { combineReducers } from 'redux';
import { reducer as courseEnrollments } from './components/course-enrollments';

import { reducer as enrolledPrograms } from './components/user-program-enrollments';
import { reducer as programDiscussions } from './components/program';

const rootReducer = combineReducers({
  enrolledPrograms,
  courseEnrollments,
  programDiscussions,
});

export default rootReducer;
