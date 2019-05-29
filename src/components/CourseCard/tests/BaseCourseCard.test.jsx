import React from 'react';
import { mount } from 'enzyme';

import BaseCourseCard from '../BaseCourseCard';

describe('<BaseCourseCard />', () => {
  describe('email settings modal', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount((
        <BaseCourseCard
          title="edX Demonstration Course"
          linkToCourse="https://edx.org"
        />
      ));
      // open email settings modal
      expect(wrapper.find('.email-settings-btn').exists()).toBeTruthy();
      wrapper.find('.email-settings-btn').simulate('click');
      expect(wrapper.find('EmailSettingsModal').exists()).toBeTruthy();
    });

    it('test modal close/cancel', () => {
      expect(wrapper.state('modals').emailSettings).not.toBeNull();
      wrapper.find('EmailSettingsModal').find('.modal-footer .js-close-modal-on-click').first().simulate('click');
      expect(wrapper.find('EmailSettingsModal').exists()).toBeFalsy();
      expect(wrapper.state('modals').emailSettings).toBeNull();
    });
  });
});
