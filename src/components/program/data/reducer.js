import {
  FETCH_PROGRAM_DISCUSSIONS_REQUEST,
  FETCH_PROGRAM_DISCUSSIONS_SUCCESS,
  FETCH_PROGRAM_DISCUSSIONS_FAILURE,
} from './constants';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const programDiscussionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROGRAM_DISCUSSIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROGRAM_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: null,
      };
    case FETCH_PROGRAM_DISCUSSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default programDiscussionsReducer;
