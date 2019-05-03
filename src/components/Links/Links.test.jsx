import React from 'react';
import renderer from 'react-test-renderer';

import Links from './Links';

const linksData = {
  title: 'examples',
  links: [
    {
      title: 'I am first',
      href: 'https://example1.com',
    },
    {
      title: 'I am second',
      href: 'https://example2.com',
    },
    {
      title: 'I am third',
      href: 'https://example3.com',
    },
  ],
};

describe('<Links />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create((
        <Links title={linksData.title} links={linksData.links} />
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
