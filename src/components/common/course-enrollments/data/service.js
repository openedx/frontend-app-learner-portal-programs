import qs from 'query-string';
import apiClient from '../../../../apiClient';

import enterpriseCourseEnrollments from './__mocks__/enterpriseCourseEnrollments.json';

export const fetchProgramCourseEnrollments = (programUUID) => {
  const url = `${process.env.LMS_BASE_URL}/api/program_enrollments/v1/programs/${programUUID}/overview/`;
  return apiClient.get(url);
};

export const fetchEnterpriseCourseEnrollments = (enterpriseUUID) => {
  const queryParams = {
    enterprise_id: enterpriseUUID,
  };
  const url = `${process.env.LMS_BASE_URL}/enterprise_learner_portal/api/v1/enterprise_course_enrollments/?${qs.stringify(queryParams)}`;
  // return apiClient.get(url);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: enterpriseCourseEnrollments });
    }, 1200);
  });
};
