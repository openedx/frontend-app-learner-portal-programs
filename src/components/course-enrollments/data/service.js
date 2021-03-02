import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export const fetchProgramCourseEnrollments = (programUUID) => {
  const authenticatedHttpClient = getAuthenticatedHttpClient();
  const url = `${process.env.LMS_BASE_URL}/api/program_enrollments/v1/programs/${programUUID}/overview/`;
  return authenticatedHttpClient.get(url);
};
