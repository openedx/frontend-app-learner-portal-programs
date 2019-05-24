import {
  PROGRAMS_REQUEST,
  PROGRAMS_SUCCESS,
  PROGRAMS_FAILURE,
  CLEAR_PROGRAMS,
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
    case PROGRAMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROGRAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
      };
    case PROGRAMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_PROGRAMS:
      return {
        loading: false,
        error: null,
        data: {
          course_runs: [],
        },
      };
    default:
      return state;
  }
};

export default programEnrollmentsReducer;
