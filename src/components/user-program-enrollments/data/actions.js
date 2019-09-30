import {
  FETCH_USER_PROGRAM_ENROLLMENTS_REQUEST,
  FETCH_USER_PROGRAM_ENROLLMENTS_SUCCESS,
  FETCH_USER_PROGRAM_ENROLLMENTS_FAILURE,
} from './constants';

import * as service from './service';

const fetchUserProgramEnrollmentsRequest = () => ({
  type: FETCH_USER_PROGRAM_ENROLLMENTS_REQUEST,
});

const fetchUserProgramEnrollmentsSuccess = data => ({
  type: FETCH_USER_PROGRAM_ENROLLMENTS_SUCCESS,
  payload: {
    data,
  },
});

const fetchUserProgramEnrollmentsFailure = error => ({
  type: FETCH_USER_PROGRAM_ENROLLMENTS_FAILURE,
  payload: {
    error,
  },
});

const fetchUserProgramEnrollments = () => (
  (dispatch) => {
    dispatch(fetchUserProgramEnrollmentsRequest());
    return service.fetchUserProgramEnrollments()
      .then((response) => {
        dispatch(fetchUserProgramEnrollmentsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserProgramEnrollmentsFailure(error));
      });
  }
);

export {
  // eslint-disable-next-line import/prefer-default-export
  fetchUserProgramEnrollments,
};
