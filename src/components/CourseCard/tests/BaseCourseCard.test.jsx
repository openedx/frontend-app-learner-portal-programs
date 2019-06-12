import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';


import BaseCourseCard from '../BaseCourseCard';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  state: {
    modals: {
      emailSettings: null,
    },
    hasEmailsEnabled: false,
    hasNewEmailSettings: false,
  },
});

describe('<BaseCourseCard />', () => {
  describe('email settings modal', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount((
        <Provider store={store}>
          <BaseCourseCard
            title="edX Demonstration Course"
            linkToCourse="https://edx.org"
            courseRunId="my+course+key"
          />
        </Provider>
      ));
      // open email settings modal
      expect(wrapper.find('.email-settings-btn').exists()).toBeTruthy();
      wrapper.find('.email-settings-btn').simulate('click');
      expect(wrapper.find('EmailSettingsModal').exists()).toBeTruthy();
    });

    it('test modal close/cancel', () => {
      expect(wrapper.find('BaseCourseCard').state('modals').emailSettings).not.toBeNull();
      wrapper.find('EmailSettingsModal').find('.modal-footer .js-close-modal-on-click').first().simulate('click');
      expect(wrapper.find('EmailSettingsModal').exists()).toBeFalsy();
      expect(wrapper.find('BaseCourseCard').state('modals').emailSettings).toBeNull();
    });
  });
});
