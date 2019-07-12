import programEnrollmentsReducer from './programEnrollments';
import {
  PROGRAM_ENROLLMENTS_REQUEST,
  PROGRAM_ENROLLMENTS_SUCCESS,
  PROGRAM_ENROLLMENTS_FAILURE,
  CLEAR_PROGRAM_ENROLLMENTS,
} from '../constants/programEnrollments';

const initialState = {
  loading: false,
  data: {
    course_runs: [],
  },
  error: null,
};

describe('programEnrollments reducer', () => {
  it('should return the initial state', () => {
    expect(programEnrollmentsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle PROGRAM_ENROLLMENTS_REQUEST', () => {
    const expected = {
      loading: true,
      data: {
        course_runs: [],
      },
      error: null,
    };
    expect(programEnrollmentsReducer(undefined, {
      type: PROGRAM_ENROLLMENTS_REQUEST,
    })).toEqual(expected);
  });

  it('should handle PROGRAM_ENROLLMENTS_SUCCESS', () => {
    const expected = {
      loading: false,
      data: {
        course_runs: [],
      },
      courseRuns: ['some data'],
      error: null,
    };
    expect(programEnrollmentsReducer(undefined, {
      type: PROGRAM_ENROLLMENTS_SUCCESS,
      payload: {
        data: {
          course_runs: ['some data'],
        },
      },
    })).toEqual(expected);
  });

  it('should handle PROGRAM_ENROLLMENTS_FAILURE', () => {
    const expected = {
      ...initialState,
      loading: false,
      error: 'sorry there was an error!',
    };
    expect(programEnrollmentsReducer(undefined, {
      type: PROGRAM_ENROLLMENTS_FAILURE,
      payload: {
        error: 'sorry there was an error!',
      },
    })).toEqual(expected);
  });

  it('should handle CLEAR_PROGRAM_ENROLLMENTS', () => {
    const expected = {
      loading: false,
      error: null,
      courseRuns: [],
    };
    expect(programEnrollmentsReducer(undefined, {
      type: CLEAR_PROGRAM_ENROLLMENTS,
    })).toEqual(expected);
  });
});
