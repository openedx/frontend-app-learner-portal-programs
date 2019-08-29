import { camelCaseObject } from '../../../../common/utils';

import {
  FETCH_COURSE_ENROLLMENTS_REQUEST,
  FETCH_COURSE_ENROLLMENTS_SUCCESS,
  FETCH_COURSE_ENROLLMENTS_FAILURE,
  CLEAR_COURSE_ENROLLMENTS,
} from './constants';
import * as service from './service';

const fetchCourseEnrollmentsRequest = () => ({
  type: FETCH_COURSE_ENROLLMENTS_REQUEST,
});

const fetchCourseEnrollmentsSuccess = data => ({
  type: FETCH_COURSE_ENROLLMENTS_SUCCESS,
  payload: {
    data,
  },
});

const fetchCourseEnrollmentsFailure = error => ({
  type: FETCH_COURSE_ENROLLMENTS_FAILURE,
  payload: {
    error,
  },
});

const clearCourseEnrollmentsFn = () => ({ type: CLEAR_COURSE_ENROLLMENTS });

const transformCourseEnrollmentsResponse = ({ responseData, options }) => {
  const camelCaseResponseData = camelCaseObject(responseData);
  if (options.pageType === 'pages.ProgramPage') {
    return camelCaseResponseData.courseRuns;
  }
  return [...camelCaseResponseData];
};

export const fetchCourseEnrollments = options => (
  (dispatch) => {
    dispatch(fetchCourseEnrollmentsRequest());
    let serviceMethod;
    if (options.pageType === 'pages.EnterprisePage') {
      serviceMethod = () => service.fetchEnterpriseCourseEnrollments(options.enterpriseUUID);
    } else {
      serviceMethod = () => service.fetchProgramCourseEnrollments(options.programUUID);
    }
    return serviceMethod()
      .then((response) => {
        const transformedResponse = transformCourseEnrollmentsResponse({
          responseData: response.data,
          options,
        });
        dispatch(fetchCourseEnrollmentsSuccess(transformedResponse));
      })
      .catch((error) => {
        dispatch(fetchCourseEnrollmentsFailure(error));
      });
  }
);

export const clearCourseEnrollments = () => (
  (dispatch) => {
    dispatch(clearCourseEnrollmentsFn());
  }
);
