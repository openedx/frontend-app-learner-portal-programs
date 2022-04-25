import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const fetchProgramDiscussions = (programUUID) => {
  const authenticatedHttpClient = getAuthenticatedHttpClient();
  const url = `${process.env.LMS_BASE_URL}/dashboard/programs/${programUUID}/discussion/`;
  return authenticatedHttpClient.get(url);
};

const fetchProgramLiveSettings = (programUUID) => {
  const authenticatedHttpClient = getAuthenticatedHttpClient();
  const url = `${process.env.LMS_BASE_URL}/dashboard/programs/${programUUID}/live/`;
  return authenticatedHttpClient.get(url);
};

// eslint-disable-next-line import/prefer-default-export
export { fetchProgramDiscussions, fetchProgramLiveSettings };
