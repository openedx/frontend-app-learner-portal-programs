import {
  FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
  CLEAR_PROGRAM_COURSE_ENROLLMENTS,
} from './constants';
import * as service from './service';

const fetchProgramEnrollmentOverviewRequest = () => ({
  type: FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST,
});

const fetchProgramEnrollmentOverviewSuccess = data => ({
  type: FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
  payload: {
    data,
  },
});

const fetchProgramEnrollmentOverviewFailure = error => ({
  type: FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
  payload: {
    error,
  },
});

const clearProgramEnrollmentOverviewEvent = () => ({ type: CLEAR_PROGRAM_COURSE_ENROLLMENTS });

const fetchProgramEnrollmentOverview = options => (
  (dispatch) => {
    dispatch(fetchProgramEnrollmentOverviewRequest(options));
    return service.fetchProgramEnrollmentOverview(options)
      .then((response) => {
        dispatch(fetchProgramEnrollmentOverviewSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchProgramEnrollmentOverviewFailure(error));
      });
  }
);

const clearProgramEnrollmentOverview = () => (
  (dispatch) => {
    dispatch(clearProgramEnrollmentOverviewEvent());
  }
);

export {
  fetchProgramEnrollmentOverview,
  clearProgramEnrollmentOverview,
};
