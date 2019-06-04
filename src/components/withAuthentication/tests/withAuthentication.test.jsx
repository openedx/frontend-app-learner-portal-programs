import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import apiClient from '../../../data/apiClient';

import withAuthentication from '../index';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  authentication: {
    username: 'edx',
  },
});

apiClient.ensurePublicOrAuthenticationAndCookies = (_, callback) => {
  callback();
};

describe('<withAuthentication />', () => {
  it('does not render anything on initial paint', () => {
    const MyComponent = () => <div />;
    const AuthenticatedComponent = withAuthentication(MyComponent);
    const wrapper = mount((
      <Provider store={store}>
        <AuthenticatedComponent location={{ pathname: '/' }} />
      </Provider>
    ));
    expect(wrapper.html()).toBeNull();
  });
});
