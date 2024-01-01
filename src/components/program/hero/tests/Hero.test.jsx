/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render } from '@testing-library/react';
import { AppContext } from '@edx/frontend-platform/react';

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

    const { container: tree } = render(
      <AppContext.Provider value={{ pageContext }}>
        <Hero title="Example Title" />
      </AppContext.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
