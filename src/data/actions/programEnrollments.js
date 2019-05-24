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
        // This endpoint returns a 404 if no data exists,
        // so we convert it to an empty response here.
        if (error.response.status === 404) {
          dispatch(fetchProgramEnrollmentOverviewSuccess({ results: [] }));
          return;
        }
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
