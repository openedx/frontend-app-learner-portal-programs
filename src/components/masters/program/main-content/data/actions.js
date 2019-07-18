import {
  FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
  CLEAR_PROGRAM_COURSE_ENROLLMENTS,
} from './constants';
import * as service from './service';

const fetchProgramCourseEnrollmentRequest = () => ({
  type: FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST,
});

const fetchProgramCourseEnrollmentSuccess = data => ({
  type: FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
  payload: {
    data,
  },
});

const fetchProgramCourseEnrollmentFailure = error => ({
  type: FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
  payload: {
    error,
  },
});

const clearProgramCourseEnrollmentEvent = () => ({ type: CLEAR_PROGRAM_COURSE_ENROLLMENTS });

const fetchProgramCourseEnrollment = options => (
  (dispatch) => {
    dispatch(fetchProgramCourseEnrollmentRequest(options));
    return service.fetchProgramCourseEnrollment(options)
      .then((response) => {
        dispatch(fetchProgramCourseEnrollmentSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchProgramCourseEnrollmentFailure(error));
      });
  }
);

const clearProgramCourseEnrollment = () => (
  (dispatch) => {
    dispatch(clearProgramCourseEnrollmentEvent());
  }
);

export {
  fetchProgramCourseEnrollment,
  clearProgramCourseEnrollment,
};
