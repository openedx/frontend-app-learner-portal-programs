import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import updateEmailSettings from './emailSettings';
import {
  UPDATE_EMAIL_SETTINGS_REQUEST,
  UPDATE_EMAIL_SETTINGS_SUCCESS,
  UPDATE_EMAIL_SETTINGS_FAILURE,
} from '../constants/emailSettings';
import LmsApiService from '../services/LmsApiService';

const mockStore = configureMockStore([thunk]);
jest.mock('../services/LmsApiService');

describe('emailSettings actions', () => {
  const settings = {
    courseRunId: 'my+course+id',
    hasEmailEnabled: true,
    onSuccess: () => {},
    onError: () => {},
  };

  it('email settings request success', () => {
    const expectedActions = [
      { type: UPDATE_EMAIL_SETTINGS_REQUEST },
      {
        type: UPDATE_EMAIL_SETTINGS_SUCCESS,
        payload: {
          data: 'This is some data',
        },
      },
    ];
    const store = mockStore();

    LmsApiService.updateEmailSettings.mockImplementation((
      () => Promise.resolve({ data: 'This is some data' })
    ));

    return store.dispatch(updateEmailSettings({ ...settings }))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('email settings request failure', () => {
    const expectedActions = [
      { type: UPDATE_EMAIL_SETTINGS_REQUEST },
      {
        type: UPDATE_EMAIL_SETTINGS_FAILURE,
        payload: {
          error: Error,
        },
      },
    ];
    const store = mockStore();

    LmsApiService.updateEmailSettings.mockImplementation((
      () => Promise.reject(Error)
    ));

    return store.dispatch(updateEmailSettings({ ...settings }))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});
