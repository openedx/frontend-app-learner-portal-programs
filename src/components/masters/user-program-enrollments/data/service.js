import apiClient from '../../../../apiClient';

const fetchUserProgramEnrollments = () => {
  const url = `${process.env.LMS_BASE_URL}/api/program_enrollments/v1/programs/enrollments/`;
  return apiClient.get(url);
};

// eslint-disable-next-line import/prefer-default-export
export { fetchUserProgramEnrollments };
