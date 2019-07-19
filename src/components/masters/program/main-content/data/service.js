import apiClient from '../../../../../apiClient';

const fetchProgramCourseEnrollments = (programUUID) => {
  const programEnrollmentOverviewUrl = `${process.env.LMS_BASE_URL}/api/program_enrollments/v1/programs/${programUUID}/overview/`;
  return apiClient.get(programEnrollmentOverviewUrl);
};

// eslint-disable-next-line import/prefer-default-export
export { fetchProgramCourseEnrollments };
