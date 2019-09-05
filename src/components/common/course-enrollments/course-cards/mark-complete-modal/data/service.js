import qs from 'query-string';

import enterpriseCourseEnrollment from './__mocks__/enterpriseCourseEnrollment.json';

// eslint-disable-next-line import/prefer-default-export
export const markCourseAsCompleteRequest = (options) => {
  // eslint-disable-next-line no-unused-vars
  let url = `${process.env.LMS_BASE_URL}/enterprise_learner_portal/api/v1/enterprise_course_enrollments/`;
  if (options) {
    url += `?${qs.stringify(options)}`;
  }

  // Temporarily mock out API response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(enterpriseCourseEnrollment);
    }, 1200);
  });
};
