/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render } from '@testing-library/react';
import { AppContext } from '@edx/frontend-platform/react';

import ProgramSidebar from '../ProgramSidebar';

describe('<ProgramSidebar />', () => {
  it('renders correctly', () => {
    const pageContext = {
      programDocuments: null,
      externalProgramWebsite: 'https://edx.org',
    };
    const { container: tree } = render(
      <AppContext.Provider value={{ pageContext }}>
        <ProgramSidebar />
      </AppContext.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with links', () => {
    const pageContext = {
      programDocuments: {
        header: 'Program Documents',
        display: true,
        documents: [
          {
            display_text: 'Test Document',
            document: '/test/document',
          },
          {
            display_text: 'Test Link',
            url: 'example.com/1',
          },
          {
            display_text: 'Test Document 2',
            document: '/test/document2',
          },
        ],
      },
      externalProgramWebsite: 'https://edx.org',
    };
    const { container: tree } = render(
      <AppContext.Provider value={{ pageContext }}>
        <ProgramSidebar />
      </AppContext.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
