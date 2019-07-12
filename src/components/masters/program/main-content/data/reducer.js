import {
  FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS,
  FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE,
  CLEAR_PROGRAM_COURSE_ENROLLMENTS,
} from './constants';

const initialState = {
  loading: false,
  data: {
    course_runs: [],
  },
  error: null,
};

const programCourseEnrollmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROGRAM_COURSE_ENROLLMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROGRAM_COURSE_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        courseRuns: action.payload.data.course_runs,
      };
    case FETCH_PROGRAM_COURSE_ENROLLMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_PROGRAM_COURSE_ENROLLMENTS:
      return {
        loading: false,
        error: null,
        courseRuns: [],
      };
    default:
      return state;
  }
};

export default programCourseEnrollmentsReducer;
