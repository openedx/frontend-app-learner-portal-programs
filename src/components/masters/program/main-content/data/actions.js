import {
  FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
  CLEAR_PROGRAM_COURSE_ENROLLMENTS,
} from './constants';
import * as service from './service';

const fetchProgramCourseEnrollmentsRequest = () => ({
  type: FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST,
});

const fetchProgramCourseEnrollmentsSuccess = data => ({
  type: FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
  payload: {
    data,
  },
});

const fetchProgramCourseEnrollmentsFailure = error => ({
  type: FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
  payload: {
    error,
  },
});

const clearProgramCourseEnrollmentsEvent = () => ({ type: CLEAR_PROGRAM_COURSE_ENROLLMENTS });

const fetchProgramCourseEnrollments = options => (
  (dispatch) => {
    dispatch(fetchProgramCourseEnrollmentsRequest(options));
    return service.fetchProgramCourseEnrollments(options)
      .then((response) => {
        dispatch(fetchProgramCourseEnrollmentsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchProgramCourseEnrollmentsFailure(error));
      });
  }
);

const clearProgramCourseEnrollments = () => (
  (dispatch) => {
    dispatch(clearProgramCourseEnrollmentsEvent());
  }
);

export {
  fetchProgramCourseEnrollments,
  clearProgramCourseEnrollments,
};
