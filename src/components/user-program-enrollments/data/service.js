import apiClient from '@edx/frontend-learner-portal-base/src/apiClient';
import { getConfig } from '@edx/frontend-platform';

const fetchUserProgramEnrollments = () => {
  const url = `${getConfig().LMS_BASE_URL}/api/program_enrollments/v1/programs/enrollments/`;
  return apiClient.get(url);
};

// eslint-disable-next-line import/prefer-default-export
export { fetchUserProgramEnrollments };
