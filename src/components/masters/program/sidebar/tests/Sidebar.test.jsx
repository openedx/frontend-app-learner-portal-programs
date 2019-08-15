import React from 'react';
import renderer from 'react-test-renderer';

import { LayoutContext } from '../../../../common/layout';

import Sidebar from '../Sidebar';

describe('<Sidebar />', () => {
  it('renders correctly', () => {
    const pageContext = {
      programDocuments: null,
      externalProgramWebsite: 'https://edx.org',
    };
    const tree = renderer
      .create((
        <LayoutContext.Provider value={{ pageContext }}>
          <Sidebar />
        </LayoutContext.Provider>
      ))
      .toJSON();
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
    const tree = renderer.create((
      <LayoutContext.Provider value={{ pageContext }}>
        <Sidebar />
      </LayoutContext.Provider>
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
