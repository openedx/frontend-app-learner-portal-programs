import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const fetchUserProgramEnrollments = () => {
  const authenticatedHttpClient = getAuthenticatedHttpClient()
  const url = `${process.env.LMS_BASE_URL}/api/program_enrollments/v1/programs/enrollments/`;
  return authenticatedHttpClient.get(url);
};

// eslint-disable-next-line import/prefer-default-export
export { fetchUserProgramEnrollments };
