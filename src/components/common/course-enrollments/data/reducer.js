import {
  FETCH_COURSE_ENROLLMENTS_REQUEST,
  FETCH_COURSE_ENROLLMENTS_SUCCESS,
  FETCH_COURSE_ENROLLMENTS_FAILURE,
  CLEAR_COURSE_ENROLLMENTS,
} from './constants';

const initialState = {
  isLoading: false,
  courseRuns: [],
  error: null,
};

const courseEnrollmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_ENROLLMENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_COURSE_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        courseRuns: action.payload.data,
      };
    case FETCH_COURSE_ENROLLMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case CLEAR_COURSE_ENROLLMENTS:
      return initialState;
    default:
      return state;
  }
};

export default courseEnrollmentsReducer;
