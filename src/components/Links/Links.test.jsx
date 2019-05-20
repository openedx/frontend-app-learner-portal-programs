import React from 'react';
import { shallow } from 'enzyme';

import Links from './Links';

const linksData = {
  id: 'examples',
  title: 'Examples',
  links: [...new Array(8)].map((_, index) => ({
    title: `Test ${index + 1}`,
    href: `http://example.com/${index + 1}`,
  })),
};

describe('<Links />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((
      <Links id={linksData.id} title={linksData.title} links={linksData.links} />
    ));
  });

  it('renders at most 5 links by default', () => {
    const listItems = wrapper.find('li');
    expect(listItems).toHaveLength(5);
    expect(wrapper.find('.toggle-show-all-btn').exists()).toBeTruthy();
  });

  it('renders all links when toggled', () => {
    wrapper.find('.toggle-show-all-btn').simulate('click');
    const listItems = wrapper.find('li');
    expect(listItems).toHaveLength(8);
  });
});
