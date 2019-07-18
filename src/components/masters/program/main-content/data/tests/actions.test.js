import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
  CLEAR_PROGRAM_COURSE_ENROLLMENTS,
} from '../constants';
import {
  fetchProgramCourseEnrollments,
  clearProgramCourseEnrollments,
} from '../actions';
import * as service from '../service';

const mockStore = configureMockStore([thunk]);
jest.mock('../service');

describe('fetchProgramCourseEnrollment action', () => {
  it('fetch program course enrollment success', () => {
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

    service.fetchProgramCourseEnrollments.mockImplementation((
      () => Promise.resolve({ data: 'This is some data' })
    ));

    return store.dispatch(fetchProgramCourseEnrollments())
      .then(() => expect(store.getActions()).toEqual(expectedAction));
  });

  it('fetch program course enrollment failure', () => {
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

    service.fetchProgramCourseEnrollments.mockImplementation((
      () => Promise.reject(Error)
    ));

    return store.dispatch(fetchProgramCourseEnrollments())
      .then(() => expect(store.getActions()).toEqual(expectedAction));
  });
});


describe('clearProgramCourseEnrollment action', () => {
  it('clear program course enrollment overview', () => {
    const expectedAction = [
      { type: CLEAR_PROGRAM_COURSE_ENROLLMENTS },
    ];
    const store = mockStore();

    store.dispatch(clearProgramCourseEnrollments());

    expect(store.getActions()).toEqual(expectedAction);
  });
});
