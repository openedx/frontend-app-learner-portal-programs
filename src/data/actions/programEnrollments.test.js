import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  PROGRAM_ENROLLMENTS_REQUEST,
  PROGRAM_ENROLLMENTS_SUCCESS,
  PROGRAM_ENROLLMENTS_FAILURE,
  CLEAR_PROGRAM_ENROLLMENTS,
} from '../constants/programEnrollments';
import {
  fetchProgramEnrollmentOverview,
  clearProgramEnrollmentOverview,
} from './programEnrollments';
import LmsApiService from '../services/LmsApiService';

const mockStore = configureMockStore([thunk]);
jest.mock('../services/LmsApiService');

describe('fetchProgramEnrollmentOverview action', () => {
  it('fetch program enrollment success', () => {
    const expectedAction = [
      { type: PROGRAM_ENROLLMENTS_REQUEST },
      {
        type: PROGRAM_ENROLLMENTS_SUCCESS,
        payload: {
          data: 'This is some data',
        },
      },
    ];
    const store = mockStore();

    LmsApiService.fetchProgramEnrollmentOverview.mockImplementation((
      () => Promise.resolve({ data: 'This is some data' })
    ));

    return store.dispatch(fetchProgramEnrollmentOverview())
      .then(() => expect(store.getActions()).toEqual(expectedAction));
  });

  it('fetch program enrollment failure', () => {
    const expectedAction = [
      { type: PROGRAM_ENROLLMENTS_REQUEST },
      {
        type: PROGRAM_ENROLLMENTS_FAILURE,
        payload: {
          error: Error,
        },
      },
    ];
    const store = mockStore();

    LmsApiService.fetchProgramEnrollmentOverview.mockImplementation((
      () => Promise.reject(Error)
    ));

    return store.dispatch(fetchProgramEnrollmentOverview())
      .then(() => expect(store.getActions()).toEqual(expectedAction));
  });
});

describe('clearProgramEnrollmentOverview', () => {
  const expectedAction = [
    { type: CLEAR_PROGRAM_ENROLLMENTS },
  ];

  const store = mockStore();

  LmsApiService.fetchProgramEnrollmentOverview.mockImplementation((
    () => Promise.resolve({ data: 'This is some data' })
  ));

  store.dispatch(fetchProgramEnrollmentOverview())
    .then(() => store.dispatch(clearProgramEnrollmentOverview()))
    .then(() => expect(store.getActions()).toEqual(expectedAction));
});
