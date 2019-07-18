import programCourseEnrollmentsReducer from '../reducer';
import {
  FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
  CLEAR_PROGRAM_COURSE_ENROLLMENTS,
} from '../constants';

const initialState = {
  loading: false,
  data: {
    course_runs: [],
  },
  error: null,
};

describe('programEnrollments reducer', () => {
  it('should return the initial state', () => {
    expect(programCourseEnrollmentsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST', () => {
    const expected = {
      loading: true,
      data: {
        course_runs: [],
      },
      error: null,
    };
    expect(programCourseEnrollmentsReducer(undefined, {
      type: FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST,
    })).toEqual(expected);
  });

  it('should handle FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS', () => {
    const expected = {
      loading: false,
      data: {
        course_runs: [],
      },
      courseRuns: ['some data'],
      error: null,
    };
    expect(programCourseEnrollmentsReducer(undefined, {
      type: FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
      payload: {
        data: {
          course_runs: ['some data'],
        },
      },
    })).toEqual(expected);
  });

  it('should handle FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE', () => {
    const expected = {
      ...initialState,
      loading: false,
      error: Error,
    };
    expect(programCourseEnrollmentsReducer(undefined, {
      type: FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
      payload: {
        error: Error,
      },
    })).toEqual(expected);
  });

  it('should handle CLEAR_PROGRAM_COURSE_ENROLLMENTS', () => {
    const expected = {
      loading: false,
      error: null,
      courseRuns: [],
    };
    expect(programCourseEnrollmentsReducer(undefined, {
      type: CLEAR_PROGRAM_COURSE_ENROLLMENTS,
    })).toEqual(expected);
  });
});
