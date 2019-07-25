import React from 'react';
import renderer from 'react-test-renderer';

import Sidebar from '../Sidebar';

describe('<Sidebar />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create((
        <Sidebar />
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with links', () => {
    const programDocuments = {
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
    };

    const tree = renderer.create((
      <Sidebar programDocuments={programDocuments} />
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
