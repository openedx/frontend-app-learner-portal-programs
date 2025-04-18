import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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

  it('correctly renders the loading page', async () => {
    const { container: tree } = render(
      <IntlProvider locale="en">
        <ProgramListPage
          isLoading
          pageContext={pageContext}
          fetchUserProgramEnrollments={jest.fn()}
        />
      </IntlProvider>,
    );
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it('renders fetching program error page when there are issues fetching the user programs', () => {
    const { container: tree } = render(
      <IntlProvider locale="en">
        <ProgramListPage
          isLoading={false}
          error={new Error()}
          pageContext={pageContext}
          fetchUserProgramEnrollments={jest.fn()}
        />
      </IntlProvider>,
    );
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

    const wrapper = render((
      <ProgramListPage
        pageContext={pageContext}
        isLoading={false}
        fetchUserProgramEnrollments={jest.fn()}
      />
    ));

    wrapper.rerender(<ProgramListPage
      pageContext={pageContext}
      isLoading={false}
      fetchUserProgramEnrollments={jest.fn()}
      enrolledPrograms={data}
    />);

    expect(wrapper.container.querySelector('.table-responsive')).toBeTruthy();
    expect(wrapper.container.querySelectorAll('tbody tr').length).toEqual(2);
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

    const wrapper = render((
      <ProgramListPage
        pageContext={pageContext}
        isLoading={false}
        fetchUserProgramEnrollments={jest.fn()}
      />
    ));

    wrapper.rerender(<ProgramListPage
      pageContext={pageContext}
      isLoading={false}
      fetchUserProgramEnrollments={jest.fn()}
      enrolledPrograms={data}
    />);

    expect(wrapper.container.querySelector('.table-responsive')).toBeFalsy();
    expect(screen.getByRole('alert')).toBeTruthy();
  });
});
