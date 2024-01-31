/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as analytics from '@edx/frontend-platform/analytics';
import { AppContext } from '@edx/frontend-platform/react';

import BaseCourseCard from '../BaseCourseCard';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  userAccount: {
    username: 'edx',
  },
});

describe('<BaseCourseCard />', () => {
  describe('email settings modal', () => {
    let wrapper;
    // eslint-disable-next-line no-import-assign
    analytics.sendTrackEvent = jest.fn();

    beforeEach(() => {
      const pageContext = {
        enterpriseName: 'test-enterprise-name',
      };
      wrapper = render((
        <Provider store={store}>
          <AppContext.Provider value={{ pageContext }}>
            <BaseCourseCard
              type="completed"
              title="edX Demonstration Course"
              linkToCourse="https://edx.org"
              courseRunId="my+course+key"
              hasEmailsEnabled
            />
          </AppContext.Provider>
        </Provider>
      ));
      // open email settings modal
      fireEvent.click(wrapper.container.querySelector('button.dropdown-toggle'));
      fireEvent.click(wrapper.container.querySelector('button.dropdown-item'));
      expect(screen.getByText('Email Settings for edX Demonstration Course')).toBeTruthy();
    });

    it('test modal close/cancel', () => {
      fireEvent.click(screen.getAllByText('Close')[1]);
      expect(screen.queryByText('Email Settings for edX Demonstration Course')).toBeFalsy();
    });
  });
});
