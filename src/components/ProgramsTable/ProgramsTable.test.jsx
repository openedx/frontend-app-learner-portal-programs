import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { StaticQuery } from 'gatsby';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import ProgramsTable from './ProgramsTable';

const mockStore = configureMockStore([thunk]);

describe('ProgramsTable', () => {
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

  const programQueryData = [
    {
      node: {
        context: {
          programUUID: '6eefc008-db50-46f0-8746-667f55533a5d',
          programName: 'Example Program',
          programSlug: 'exampleprogram',
          programHostname: 'http://localhost:8734',
        },
      },
    },
    {
      node: {
        context: {
          programUUID: '6eefc008-db50-46f0-8746-667f55533a5e',
          programName: 'Another Program',
          programSlug: 'another-program',
          programHostname: 'http:www.hey.com',
        },
      },
    }];

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
            <ProgramsTable programQueryData={programQueryData} />
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
            <ProgramsTable programQueryData={programQueryData} />
          </Provider>
        </IntlProvider>
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // below tests need work :(
  it('renders table when there are valid programs', () => {
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
        data: [
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
        ],
        error: null,
      },
    });

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

    const wrapper = mount((
      <IntlProvider locale="en">
        <Provider store={store}>
          <ProgramsTable
            programQueryData={programQueryData}
          />
        </Provider>
      </IntlProvider>
    ));

    wrapper.setProps({ children: <ProgramsTable data={data} /> });

    expect(wrapper.find('.table-responsive').exists()).toBeTruthy();
  });

  it('renders error page when there are no valid programs', () => {
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
        data: [
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
        ],
        error: null,
      },
    });

    const tree = renderer
      .create((
        <IntlProvider locale="en">
          <Provider store={store}>
            <ProgramsTable programQueryData={programQueryData} />
          </Provider>
        </IntlProvider>
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
