import { combineReducers } from 'redux';
import { userAccount } from '@edx/frontend-auth';

import programEnrollments from './programEnrollments';
import { reducer as enrolledPrograms } from '../../components/ProgramsTable';

const identityReducer = (state) => {
  const newState = { ...state };
  return newState;
};

const rootReducer = combineReducers({
  // The authentication state is added as initialState when
  // creating the store in data/store.js.
  authentication: identityReducer,
  userAccount,
  programEnrollments,
  enrolledPrograms,
});

export default rootReducer;
