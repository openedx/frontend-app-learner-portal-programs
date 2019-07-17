import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
  CLEAR_PROGRAM_COURSE_ENROLLMENTS,
} from '../constants';
import {
  fetchProgramEnrollmentOverview,
  clearProgramEnrollmentOverview,
} from '../actions';
import * as service from '../service';

const mockStore = configureMockStore([thunk]);
jest.mock('../service');

describe('fetchProgramEnrollmentOverview action', () => {
  it('fetch program enrollment success', () => {
    const expectedAction = [
      { type: FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST },
      {
        type: FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
        payload: {
          data: 'This is some data',
        },
      },
    ];
    const store = mockStore();

    service.fetchProgramEnrollment.mockImplementation((
      () => Promise.resolve({ data: 'This is some data' })
    ));

    return store.dispatch(fetchProgramEnrollmentOverview())
      .then(() => expect(store.getActions()).toEqual(expectedAction));
  });

  it('fetch program enrollment failure', () => {
    const expectedAction = [
      { type: FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST },
      {
        type: FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
        payload: {
          error: Error,
        },
      },
    ];
    const store = mockStore();

    service.fetchProgramEnrollment.mockImplementation((
      () => Promise.reject(Error)
    ));

    return store.dispatch(fetchProgramEnrollmentOverview())
      .then(() => expect(store.getActions()).toEqual(expectedAction));
  });
});


describe('clearProgramEnrollmentOverview action', () => {
  it('clear program enrollment overview', () => {
    const expectedAction = [
      { type: CLEAR_PROGRAM_COURSE_ENROLLMENTS },
    ];
    const store = mockStore();

    store.dispatch(clearProgramEnrollmentOverview());

    expect(store.getActions()).toEqual(expectedAction);
  });
});
