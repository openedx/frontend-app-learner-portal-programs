import {
  PROGRAM_ENROLLMENTS_REQUEST,
  PROGRAM_ENROLLMENTS_SUCCESS,
  PROGRAM_ENROLLMENTS_FAILURE,
  CLEAR_PROGRAM_ENROLLMENTS,
} from '../constants/programEnrollments';
import LmsApiService from '../services/LmsApiService';

const fetchProgramEnrollmentOverviewRequest = () => ({
  type: PROGRAM_ENROLLMENTS_REQUEST,
});

const fetchProgramEnrollmentOverviewSuccess = data => ({
  type: PROGRAM_ENROLLMENTS_SUCCESS,
  payload: {
    data,
  },
});

const fetchProgramEnrollmentOverviewFailure = error => ({
  type: PROGRAM_ENROLLMENTS_FAILURE,
  payload: {
    error,
  },
});

const clearProgramEnrollmentOverviewEvent = () => ({ type: CLEAR_PROGRAM_ENROLLMENTS });

const fetchProgramEnrollmentOverview = options => (
  (dispatch) => {
    dispatch(fetchProgramEnrollmentOverviewRequest(options));
    return LmsApiService.fetchProgramEnrollmentOverview(options)
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
