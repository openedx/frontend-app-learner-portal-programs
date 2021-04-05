import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import {
  fetchProgramCourseEnrollments,
} from '../service';

jest.mock('@edx/frontend-platform/auth');
const axiosMock = new MockAdapter(axios);
getAuthenticatedHttpClient.mockReturnValue(axios);
axiosMock.onAny().reply(200);
axios.get = jest.fn();

describe('course enrollments service', () => {
  it('fetches program enrollments', () => {
    const url = 'http://localhost:18000/api/program_enrollments/v1/programs/test-program-id/overview/';
    fetchProgramCourseEnrollments('test-program-id');
    expect(axios.get).toBeCalledWith(url);
  });
});
