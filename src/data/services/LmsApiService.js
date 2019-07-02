import qs from 'query-string';

import apiClient from '../apiClient';

class LmsApiService {
  static baseUrl = process.env.LMS_BASE_URL;

  static fetchProgramEnrollmentOverview(programUUID) {
    const programEnrollmentOverviewUrl = `${LmsApiService.baseUrl}/api/program_enrollments/v1/programs/${programUUID}/overview/`;
    return apiClient.get(programEnrollmentOverviewUrl);
  }

  static updateEmailSettings(courseRunId, hasEmailsEnabled) {
    const queryParams = {
      course_id: courseRunId,
      email_opt_in: hasEmailsEnabled,
    };
    const emailSettingsUrl = `${LmsApiService.baseUrl}/user_api/v1/preferences/email_opt_in/`;
    return apiClient.post(
      emailSettingsUrl,
      qs.stringify(queryParams),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  static fetchUserProgramEnrollments() {
    return apiClient.get(`${LmsApiService.baseUrl}/api/program_enrollments/v1/programs/enrollments/`);
  }
}

export default LmsApiService;
