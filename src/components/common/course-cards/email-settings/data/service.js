import qs from 'query-string';

import apiClient from '../../../../../apiClient';

const updateEmailSettings = (courseRunId, hasEmailsEnabled) => {
  const queryParams = {
    course_id: courseRunId,
    email_opt_in: hasEmailsEnabled,
  };
  const emailSettingsUrl = `${process.env.LMS_BASE_URL}/user_api/v1/preferences/email_opt_in/`;
  return apiClient.post(
    emailSettingsUrl,
    qs.stringify(queryParams),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
};

// eslint-disable-next-line import/prefer-default-export
export { updateEmailSettings };
