import {
  PROGRAMS_REQUEST,
  PROGRAMS_SUCCESS,
  PROGRAMS_FAILURE,
  CLEAR_PROGRAMS,
} from '../constants/programEnrollments';
import LmsApiService from '../services/LmsApiService';

const fetchProgramEnrollmentOverviewRequest = () => ({
  type: PROGRAMS_REQUEST,
});

const fetchProgramEnrollmentOverviewSuccess = data => ({
  type: PROGRAMS_SUCCESS,
  payload: {
    data,
  },
});

const fetchProgramEnrollmentOverviewFailure = error => ({
  type: PROGRAMS_FAILURE,
  payload: {
    error,
  },
});


const clearProgramEnrollmentOverviewEvent = () => ({ type: CLEAR_PROGRAMS });

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
