/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { breakpoints } from '@edx/paragon';
import { AppContext } from '@edx/frontend-platform/react';
import { Context as ResponsiveContext } from 'react-responsive';
import { IntlProvider } from 'react-intl';

import '../../../__mocks__/reactResponsive.mock';

import { CourseEnrollments } from '../CourseEnrollments';

const mockStore = configureMockStore([thunk]);

describe('<CourseEnrollments />', () => {
  const mockFetchCourseEnrollments = jest.fn();
  const mockClearCourseEnrollments = jest.fn();
  const mockModifyIsMarkCourseCompleteSuccess = jest.fn();
  const initialProps = {
    courseRuns: {
      in_progress: [],
      upcoming: [],
      completed: [],
    },
    isLoading: false,
    error: null,
    sidebarComponent: <div className="sidebar-example" />,
    fetchCourseEnrollments: mockFetchCourseEnrollments,
    clearCourseEnrollments: mockClearCourseEnrollments,
    isMarkCourseCompleteSuccess: false,
    modifyIsMarkCourseCompleteSuccess: mockModifyIsMarkCourseCompleteSuccess,
  };

  describe('renders course enrollments correctly', () => {
    it('with no course enrollments', () => {
      const pageContext = {};
      const wrapper = render((
        <AppContext.Provider value={{ pageContext }}>
          <CourseEnrollments {...initialProps} />
        </AppContext.Provider>
      ));
      expect(wrapper.container.querySelector('.course-section')).toBeFalsy();
    });

    it('with valid course enrollments', () => {
      const sampleCourseRun = {
        courseRunId: 'course-v1:edX+DemoX+Demo_Course',
        courseRunStatus: 'completed',
        linkToCourse: 'https://edx.org/',
        title: 'edX Demonstration Course',
        notifications: [],
        startDate: '2017-02-05T05:00:00Z',
        endDate: '2018-08-18T05:00:00Z',
        hasEmailsEnabled: true,
      };
      const courseRuns = {
        in_progress: [{
          ...sampleCourseRun,
          courseRunId: 'course-v1:edX+DemoX+Demo_Course_2',
          courseRunStatus: 'in_progress',
          title: 'edX Demonstration Course 2',
          notifications: [{
            name: 'Assignment 1',
            url: 'https://edx.org/',
            date: '2019-05-31T07:50:00Z',
          }],
          microMastersTitle: 'Example MicroMasters Program',
        }],
        upcoming: [],
        completed: [sampleCourseRun],
      };
      const pageContext = {
        programUUID: 'test-program-uuid',
      };
      const store = mockStore({
        userAccount: {
          username: 'edx',
        },
        emailSettings: {
          loading: false,
          error: null,
          data: null,
        },
      });
      const wrapper = render((
        <Provider store={store}>
          <AppContext.Provider value={{ pageContext }}>
            <CourseEnrollments
              {...initialProps}
              courseRuns={courseRuns}
            />
          </AppContext.Provider>
        </Provider>
      ));

      const courseSection = wrapper.container.querySelectorAll('.course-section');

      expect(wrapper.container.children).not.toBeNull();
      expect(courseSection.length).toEqual(2);
      expect(courseSection[0].querySelectorAll('.course').length).toEqual(1);
      expect(courseSection[courseSection.length - 1].querySelectorAll('.course').length).toEqual(1);
    });

    it('with error', () => {
      const pageContext = {};
      const { container: tree } = render(
        <AppContext.Provider value={{ pageContext }}>
          <CourseEnrollments
            {...initialProps}
            error={new Error('Network Error')}
          />
        </AppContext.Provider>,
      );
      expect(tree).toMatchSnapshot();
    });

    it('with loading', () => {
      const pageContext = {};
      const { container: tree } = render(
        <AppContext.Provider value={{ pageContext }}>
          <CourseEnrollments
            {...initialProps}
            isLoading
          />
        </AppContext.Provider>,
      );
      expect(tree).toMatchSnapshot();
    });

    it('with mark course as complete success status alert', () => {
      const pageContext = {};
      const { container: tree } = render(
        <IntlProvider locale="en">
          <AppContext.Provider value={{ pageContext }}>
            <CourseEnrollments
              {...initialProps}
              isMarkCourseCompleteSuccess
            />
          </AppContext.Provider>
        </IntlProvider>,
      );

      expect(tree).toMatchSnapshot();
    });
  });

  describe('sidebar', () => {
    let wrapper;

    it('is not shown at screen widths greater than or equal to large breakpoint', () => {
      const pageContext = {};
      wrapper = render((
        <ResponsiveContext.Provider value={{ width: breakpoints.large.minWidth }}>
          <AppContext.Provider value={{ pageContext }}>
            <CourseEnrollments {...initialProps} />
          </AppContext.Provider>
        </ResponsiveContext.Provider>
      ));
      expect(wrapper.container.querySelector('.sidebar-example')).toBeFalsy();
    });

    it('is shown at screen widths less than large breakpoint', () => {
      const pageContext = {};
      wrapper = render((
        <ResponsiveContext.Provider value={{ width: breakpoints.small.minWidth }}>
          <AppContext.Provider value={{ pageContext }}>
            <CourseEnrollments {...initialProps} />
          </AppContext.Provider>
        </ResponsiveContext.Provider>
      ));
      expect(wrapper.container.querySelector('.sidebar-example')).toBeTruthy();
    });
  });

  describe('calls appropriate fetch method depending on page type', () => {
    beforeEach(() => {
      mockFetchCourseEnrollments.mockReset();
      mockClearCourseEnrollments.mockReset();
    });

    it('for program page', () => {
      const programUUID = 'test-program-uuid';
      const pageContext = { programUUID };
      render((
        <AppContext.Provider value={{ pageContext }}>
          <CourseEnrollments {...initialProps} />
        </AppContext.Provider>
      ));
      expect(mockFetchCourseEnrollments.mock.calls.length).toEqual(1);
      expect(mockFetchCourseEnrollments).toBeCalledWith({
        programUUID,
      });
    });
  });

  it('properly closes mark course as complete success status alert', () => {
    const pageContext = {
      enterpriseUUID: 'test-enterprise-uuid',
    };
    const wrapper = render((
      <IntlProvider locale="en">
        <AppContext.Provider value={{ pageContext }}>
          <CourseEnrollments
            {...initialProps}
            isMarkCourseCompleteSuccess
          />
        </AppContext.Provider>
      </IntlProvider>
    ));
    fireEvent.click(wrapper.container.querySelector('.alert-success .btn'));
    expect(mockModifyIsMarkCourseCompleteSuccess).toBeCalledTimes(1);
  });
});
