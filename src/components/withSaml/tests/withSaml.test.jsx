import React from 'react';
import { mount } from 'enzyme';
import { StaticQuery } from 'gatsby';

import withSaml from '../index';

describe('<withSaml />', () => {
  beforeEach(() => {
    StaticQuery.mockImplementationOnce(({ render }) => (
      render({
        site: {
          siteMetadata: {
            providerSlug: 'test-saml',
          },
        },
      })
    ));
  });

  it('injects the providerSlug property in wrapped component', () => {
    const MyComponent = () => <div />;
    const SamlComponent = withSaml(MyComponent);
    const wrapper = mount(<SamlComponent />);

    expect(wrapper.find(MyComponent).prop('providerSlug')).toEqual('test-saml');
  });
});
