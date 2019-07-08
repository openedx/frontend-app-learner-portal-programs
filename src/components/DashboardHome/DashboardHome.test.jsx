import React from 'react';
import { mount } from 'enzyme';

import { StaticQuery } from 'gatsby';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import DashboardHome from './DashboardHome';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  authentication: {
    username: 'edx',
  },
  userAccount: {
    profileImage: {
      imageUrlMedium: 'someImageData',
    },
  },
});

describe('DashboardTable', () => {
  beforeEach(() => {
    StaticQuery.mockImplementationOnce(({ render }) => (
      render({
        site: {
          siteMetadata: {
            logo: 'https://edx.org',
            siteName: 'edX',
            siteUrl: 'https://edx.org',
            providerSlug: 'saml-edx-saml-test',
          },
        },
      })
    ));
  });

  it('changes state appropriately', () => {
    const mockPrograms = [{
      uuid: 'this is a bad uuid',
    }];

    const wrapper = mount(<Provider store={store}>
      <DashboardHome location={{ pathname: '/exampleprogram' }} />
                          </Provider>);

    const instance = wrapper.find('DashboardHome').instance();
    instance.validateAccess(mockPrograms);

    expect(instance.state('validAccess').toEqual(false));
  });

  it('renders dashboard if user is enrolled in the program', () => {
    const tree = renderer
      .create((
        <Provider store={store}>
          <DashboardHome location={{ pathname: '/exampleprogram' }} />
        </Provider>
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

