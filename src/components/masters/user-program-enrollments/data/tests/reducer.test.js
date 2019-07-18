import programEnrollmentsReducer from '../reducer';
import {
  FETCH_USER_PROGRAM_ENROLLMENTS_REQUEST,
  FETCH_USER_PROGRAM_ENROLLMENTS_SUCCESS,
  FETCH_USER_PROGRAM_ENROLLMENTS_FAILURE,
} from '../constants';


const initialState = {
  loading: false,
  data: null,
  error: null,
};

describe('programEnrollments reducer', () => {
  it('should return the initial state', () => {
    expect(programEnrollmentsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_USER_PROGRAM_ENROLLMENTS_REQUEST', () => {
    const expected = {
      ...initialState,
      loading: true,
      error: null,
    };
    expect(programEnrollmentsReducer(undefined, {
      type: FETCH_USER_PROGRAM_ENROLLMENTS_REQUEST,
    })).toEqual(expected);
  });

  it('should handle FETCH_USER_PROGRAM_ENROLLMENTS_SUCCESS', () => {
    const expected = {
      loading: false,
      data: {
        course_runs: ['some data'],
      },
      error: null,
    };
    expect(programEnrollmentsReducer(undefined, {
      type: FETCH_USER_PROGRAM_ENROLLMENTS_SUCCESS,
      payload: {
        data: {
          course_runs: ['some data'],
        },
      },
    })).toEqual(expected);
  });

  it('should handle FETCH_USER_PROGRAM_ENROLLMENTS_FAILURE', () => {
    const expected = {
      ...initialState,
      loading: false,
      error: Error,
    };
    expect(programEnrollmentsReducer(undefined, {
      type: FETCH_USER_PROGRAM_ENROLLMENTS_FAILURE,
      payload: {
        error: Error,
      },
    })).toEqual(expected);
  });
});
