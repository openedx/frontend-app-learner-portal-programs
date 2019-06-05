import {
  UPDATE_EMAIL_SETTINGS_REQUEST,
  UPDATE_EMAIL_SETTINGS_SUCCESS,
  UPDATE_EMAIL_SETTINGS_FAILURE,
} from '../constants/emailSettings';

import LmsApiService from '../services/LmsApiService';

const updateEmailSettingsRequest = () => ({
  type: UPDATE_EMAIL_SETTINGS_REQUEST,
});

const updateEmailSettingsSuccess = data => ({
  type: UPDATE_EMAIL_SETTINGS_SUCCESS,
  payload: {
    data,
  },
});

const updateEmailSettingsFailure = error => ({
  type: UPDATE_EMAIL_SETTINGS_FAILURE,
  payload: {
    error,
  },
});

const updateEmailSettings = ({
  courseRunId,
  hasEmailsEnabled,
  onSuccess = () => {},
  onError = () => {},
}) => (
  (dispatch) => {
    dispatch(updateEmailSettingsRequest());
    return LmsApiService.updateEmailSettings(courseRunId, hasEmailsEnabled)
      .then((response) => {
        dispatch(updateEmailSettingsSuccess(response.data));
        onSuccess(hasEmailsEnabled);
      })
      .catch((error) => {
        dispatch(updateEmailSettingsFailure(error));
        onError(error);
      });
  }
);

export default updateEmailSettings;
