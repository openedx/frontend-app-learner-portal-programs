import React from 'react';
import renderer from 'react-test-renderer';

import { AppContext } from '../../app-context';
import Hero from '../Hero';

describe('<Hero />', () => {
  it('renders correctly', () => {
    const pageContext = {
      pageBranding: {
        banner_border_color: '#FFFFFF',
        texture_image: 'https://example.com/avengersx-texture-image-440x400.png',
        cover_image: 'https://example.com/avengersx-cover-image-1000x400.png',
        organization_logo: {
          url: 'https://example.com/avengersx-logo-200x101.png',
          alt: 'Avengers logo',
        },
      },
    };

    const tree = renderer
      .create((
        <AppContext.Provider value={{ pageContext }}>
          <Hero title="Example Title" />
        </AppContext.Provider>
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
