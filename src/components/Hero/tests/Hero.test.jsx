import React from 'react';
import renderer from 'react-test-renderer';

import Hero from '../Hero';

const heroData = {
  programTitle: 'Avengers: Basic Training',
  organizationLogo: {
    url: 'https://example.com/avengersx-logo-200x101.png',
    alt: 'Avengers logo',
  },
  textureImage: 'https://example.com/avengersx-texture-image-440x400.png',
  coverImage: 'https://example.com/avengersx-cover-image-1000x400.png',
};

describe('<Hero />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create((
        <Hero {...heroData} />
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
