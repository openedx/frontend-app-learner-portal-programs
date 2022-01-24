import {
  FETCH_PROGRAM_DISCUSSIONS_REQUEST,
  FETCH_PROGRAM_DISCUSSIONS_SUCCESS,
  FETCH_PROGRAM_DISCUSSIONS_FAILURE,
  FETCH_PROGRAM_LIVE_REQUEST,
  FETCH_PROGRAM_LIVE_SUCCESS,
  FETCH_PROGRAM_LIVE_FAILURE,
} from './constants';

const initialState = {
  loading: 0,
  discussionData: {
    tabViewEnabled: false,
    discussion: {},
  },
  liveData: {},
  error: null,
};

const programSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROGRAM_DISCUSSIONS_REQUEST:
      return {
        ...state,
        loading: state.loading + 1,
        error: null,
      };
    case FETCH_PROGRAM_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        discussionData: action.payload.data,
        loading: state.loading - 1,
        error: null,
      };
    case FETCH_PROGRAM_LIVE_REQUEST:
      return {
        ...state,
        loading: state.loading + 1,
        error: null,
      };
    case FETCH_PROGRAM_LIVE_SUCCESS:
      return {
        ...state,
        liveData: action.payload.data,
        loading: state.loading - 1,
        error: null,
      };
    case FETCH_PROGRAM_DISCUSSIONS_FAILURE:
    case FETCH_PROGRAM_LIVE_FAILURE:
      return {
        ...state,
        loading: state.loading - 1,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default programSettingsReducer;
