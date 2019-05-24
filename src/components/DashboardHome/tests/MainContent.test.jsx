import React from 'react';
import { mount } from 'enzyme';
import { breakpoints } from '@edx/paragon';

import '../../../__mocks__/reactResponsive.mock';

import MainContent from '../MainContent';

describe('<MainContent />', () => {
  describe('sidebar', () => {
    let wrapper;

    it('is not shown at screen widths greater than or equal to large breakpoint', () => {
      global.innerWidth = breakpoints.large.minWidth;
      wrapper = mount(<MainContent />);
      wrapper.setState({ isProgramEnrollmentsLoading: false });
      expect(wrapper.find('Sidebar').exists()).toBeFalsy();
    });

    it('is shown at screen widths less than large breakpoint', () => {
      global.innerWidth = breakpoints.small.minWidth;
      wrapper = mount(<MainContent />);
      wrapper.setState({ isProgramEnrollmentsLoading: false });
      expect(wrapper.find('Sidebar').exists()).toBeTruthy();
    });
  });
});
