import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Links from '../Links';

const linksData = {
  id: 'examples',
  title: 'Examples',
  label: 'examples',
  links: [...new Array(8)].map((_, index) => ({
    display_text: `Test ${index + 1}`,
    document: `http://example.com/${index + 1}`,
  })),
};

describe('<Links />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render((
      <Links
        id={linksData.id}
        title={linksData.title}
        links={linksData.links}
        label={linksData.label}
      />
    ));
  });

  it('renders at most 5 links by default', () => {
    const listItems = wrapper.container.querySelectorAll('li');
    expect(listItems).toHaveLength(5);
    expect(wrapper.container.querySelector('.toggle-show-all-btn')).toBeTruthy();
    expect(wrapper.container.querySelector('.toggle-show-all-btn').querySelector('span').textContent).toEqual('show all 8');
  });

  it('renders all links when toggled', () => {
    fireEvent.click(wrapper.container.querySelector('.toggle-show-all-btn'));
    const listItems = wrapper.container.querySelectorAll('li');
    expect(listItems).toHaveLength(8);
    expect(wrapper.container.querySelector('.toggle-show-all-btn').querySelector('span').textContent).toEqual('show less');
  });

  it('renders less than 5 links correctly', () => {
    const links = linksData.links.slice(0, 3);
    wrapper = render((
      <Links id={linksData.id} title={linksData.title} links={links} label={linksData.label} />
    ));
    const listItems = wrapper.container.querySelectorAll('li');
    expect(listItems).toHaveLength(3);
    expect(wrapper.container.querySelector('.toggle-show-all-btn')).toBeFalsy();
  });
});
