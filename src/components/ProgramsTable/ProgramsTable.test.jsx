import React from 'react';
import renderer from 'react-test-renderer';
import { StaticQuery } from 'gatsby';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import ProgramsTable from './ProgramsTable';

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
          programHostname: 'exampleprogram.edx.org',
        },
      },
    },
    {
      node: {
        context: {
          programUUID: null,
          programSlug: null,
          programName: null,
          programHostname: null,
        },
      },
    },
  ];


  it('renders table when there are valid programs', () => {
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

  it('renders error page when there are not valid programs', () => {
    programQueryData[0].uuid = "totes doesn't exist";
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
