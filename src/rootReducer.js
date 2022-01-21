import { combineReducers } from 'redux';
import { reducer as courseEnrollments } from './components/course-enrollments';

import { reducer as enrolledPrograms } from './components/user-program-enrollments';
import { reducer as programSettings } from './components/program';

const rootReducer = combineReducers({
  enrolledPrograms,
  courseEnrollments,
  programSettings,
});

export default rootReducer;
