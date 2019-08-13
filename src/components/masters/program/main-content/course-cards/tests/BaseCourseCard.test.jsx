import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as analytics from '@edx/frontend-analytics';

import BaseCourseCard from '../BaseCourseCard';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('<BaseCourseCard />', () => {
  describe('email settings modal', () => {
    let wrapper;
    analytics.sendTrackEvent = jest.fn();

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
    });

    it('test modal close/cancel', () => {
      expect(wrapper.find('BaseCourseCard').state('modals').emailSettings).not.toBeNull();
      wrapper.find('EmailSettingsModal').find('.modal-footer .js-close-modal-on-click').first().simulate('click');
      const modal = wrapper.find('EmailSettingsModal');
      expect(modal.props().open).toBeFalsy();
    });
  });
});
