import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { StaticQuery } from 'gatsby';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { StatusAlert } from '@edx/paragon';

import ConnectedProgramListPage, { ProgramListPage } from '../ProgramListPage';

const mockStore = configureMockStore([thunk]);

describe('ProgramListPage', () => {
  beforeEach(() => {
    StaticQuery.mockImplementationOnce(({ render }) => (
      render({
        site: {
          siteMetadata: {
            logo: 'https://edx.org',
            siteName: 'edX',
            siteUrl: 'https://edx.org',
          },
        },
      })
    ));
  });

  const pageContext = {
    programs: [
      {
        programSlug: 'exampleprogram',
        programUUID: '6eefc008-db50-46f0-8746-667f55533a5d',
        programName: 'Example Program',
        programHostname: 'http://localhost:8734',
      },
      {
        programSlug: 'another-program',
        programUUID: '6eefc008-db50-46f0-8746-667f55533a5e',
        programName: 'Another Program',
        programHostname: 'http://localhost:8734/another-program',
      },
    ],
  };

  it('correctly renders the loading page', () => {
    const store = mockStore({
      authentication: {
        username: 'edx',
      },
      userAccount: {
        profileImage: {
          imageUrlMedium: 'someImageData',
        },
      },
      enrolledPrograms: {
        loading: true,
        error: null,
      },
    });

    const tree = renderer
      .create((
        <IntlProvider locale="en">
          <Provider store={store}>
            <ConnectedProgramListPage pageContext={pageContext} />
          </Provider>
        </IntlProvider>
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders fetching program error page when there are issues fetching the user programs', () => {
    const store = mockStore({
      authentication: {
        username: 'edx',
      },
      userAccount: {
        profileImage: {
          imageUrlMedium: 'someImageData',
        },
      },
      enrolledPrograms: {
        loading: false,
        error: new Error(),
      },
    });

    const tree = renderer
      .create((
        <IntlProvider locale="en">
          <Provider store={store}>
            <ConnectedProgramListPage pageContext={pageContext} />
          </Provider>
        </IntlProvider>
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders table when there are valid programs', () => {
    const data = [
      {
        uuid: '6eefc008-db50-46f0-8746-667f55533a5d',
        name: 'Example Program',
        slug: 'exampleprogram',
      },
      {
        uuid: '6eefc008-db50-46f0-8746-667f55533a5e',
        name: 'Another Program',
        slug: 'another-program',
      },
    ];

    const wrapper = shallow((
      <ProgramListPage
        store={mockStore()}
        pageContext={pageContext}
        isLoading={false}
        fetchUserProgramEnrollments={jest.fn()}
      />
    ));

    wrapper.setProps({ enrolledPrograms: data });

    expect(wrapper.find('.table-responsive').exists()).toBeTruthy();
    expect(wrapper.find('tbody tr').length).toEqual(2);
  });

  it('renders error page when there are no valid programs', () => {
    const data = [
      {
        uuid: 'this-is-a-fake-program',
        name: 'This is a fake program',
        slug: 'fake-program',
      },
      {
        uuid: 'this-is-another-fake-program',
        name: 'This is another fake program',
        slug: 'another-fake-program',
      },
    ];

    const wrapper = shallow((
      <ProgramListPage
        store={mockStore()}
        pageContext={pageContext}
        isLoading={false}
        fetchUserProgramEnrollments={jest.fn()}
      />
    ));

    wrapper.setProps({ enrolledPrograms: data });

    expect(wrapper.find('.table-responsive').exists()).toBeFalsy();
    expect(wrapper.find(StatusAlert).exists()).toBeTruthy();
  });
});
