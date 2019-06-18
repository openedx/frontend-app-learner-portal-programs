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

const programEnrollmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROGRAM_ENROLLMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROGRAM_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        courseRuns: action.payload.data.course_runs,
      };
    case PROGRAM_ENROLLMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_PROGRAM_ENROLLMENTS:
      return {
        loading: false,
        error: null,
        courseRuns: [],
      };
    default:
      return state;
  }
};

export default programEnrollmentsReducer;
