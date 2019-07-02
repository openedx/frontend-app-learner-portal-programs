import {
  FETCH_USER_PROGRAM_ENROLLMENTS_REQUEST,
  FETCH_USER_PROGRAM_ENROLLMENTS_SUCCESS,
  FETCH_USER_PROGRAM_ENROLLMENTS_FAILURE,
} from './constants';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const programEnrollmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROGRAM_ENROLLMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_PROGRAM_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
      };
    case FETCH_USER_PROGRAM_ENROLLMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default programEnrollmentsReducer;
