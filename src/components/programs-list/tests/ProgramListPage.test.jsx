import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Alert } from '@openedx/paragon';
import { IntlProvider } from 'react-intl';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { ProgramListPage } from '../ProgramListPage';

jest.mock('@edx/frontend-platform/auth');
getAuthenticatedUser.mockReturnValue({
  username: 'edx',
});
jest.mock('@edx/frontend-platform/analytics');

describe('ProgramListPage', () => {
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
    const tree = renderer
      .create((
        <IntlProvider locale="en">
          <ProgramListPage
            isLoading
            pageContext={pageContext}
            fetchUserProgramEnrollments={jest.fn()}
          />
        </IntlProvider>
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders fetching program error page when there are issues fetching the user programs', () => {
    const tree = renderer
      .create((
        <IntlProvider locale="en">
          <ProgramListPage
            isLoading={false}
            error={new Error()}
            pageContext={pageContext}
            fetchUserProgramEnrollments={jest.fn()}
          />
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
        pageContext={pageContext}
        isLoading={false}
        fetchUserProgramEnrollments={jest.fn()}
      />
    ));

    wrapper.setProps({ enrolledPrograms: data });

    expect(wrapper.find('.table-responsive').exists()).toBeFalsy();
    expect(wrapper.find(Alert).exists()).toBeTruthy();
  });
});
