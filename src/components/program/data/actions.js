import { camelCaseObject } from '@edx/frontend-platform/utils';

import {
  FETCH_PROGRAM_DISCUSSIONS_REQUEST,
  FETCH_PROGRAM_DISCUSSIONS_SUCCESS,
  FETCH_PROGRAM_DISCUSSIONS_FAILURE,
} from './constants';

import * as service from './service';

const fetchProgramDiscussionsRequest = () => ({
  type: FETCH_PROGRAM_DISCUSSIONS_REQUEST,
});

const fetchProgramDiscussionsSuccess = data => ({
  type: FETCH_PROGRAM_DISCUSSIONS_SUCCESS,
  payload: {
    data,
  },
});

const fetchProgramDiscussionsFailure = data => ({
  type: FETCH_PROGRAM_DISCUSSIONS_FAILURE,
  payload: {
    data,
  },
});

const fetchProgramDiscussions = programUUID => (
  (dispatch) => {
    dispatch(fetchProgramDiscussionsRequest());
    return service.fetchProgramDiscussions(programUUID)
      .then((response) => {
        dispatch(fetchProgramDiscussionsSuccess(camelCaseObject(response.data)));
      })
      .catch((error) => {
        dispatch(fetchProgramDiscussionsFailure(error));
      });
  }
);

export {
  // eslint-disable-next-line import/prefer-default-export
  fetchProgramDiscussions,
};
