import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_USER_PROGRAM_ENROLLMENTS_REQUEST,
  FETCH_USER_PROGRAM_ENROLLMENTS_SUCCESS,
  FETCH_USER_PROGRAM_ENROLLMENTS_FAILURE,
} from '../constants';
import {
  fetchUserProgramEnrollments,
} from '../actions';
import * as service from '../service';

const mockStore = configureMockStore([thunk]);
jest.mock('../service');

describe('fetchUserProgramEnrollments action', () => {
  it('fetch program enrollment success', () => {
    const expectedAction = [
      { type: FETCH_USER_PROGRAM_ENROLLMENTS_REQUEST },
      {
        type: FETCH_USER_PROGRAM_ENROLLMENTS_SUCCESS,
        payload: {
          data: 'This is some data',
        },
      },
    ];
    const store = mockStore();

    service.fetchUserProgramEnrollments.mockImplementation((
      () => Promise.resolve({ data: 'This is some data' })
    ));

    return store.dispatch(fetchUserProgramEnrollments())
      .then(() => expect(store.getActions()).toEqual(expectedAction));
  });

  it('fetch program enrollment failure', () => {
    const expectedAction = [
      { type: FETCH_USER_PROGRAM_ENROLLMENTS_REQUEST },
      {
        type: FETCH_USER_PROGRAM_ENROLLMENTS_FAILURE,
        payload: {
          error: Error,
        },
      },
    ];
    const store = mockStore();

    service.fetchUserProgramEnrollments.mockImplementation((
      () => Promise.reject(Error)
    ));

    return store.dispatch(fetchUserProgramEnrollments())
      .then(() => expect(store.getActions()).toEqual(expectedAction));
  });
});
