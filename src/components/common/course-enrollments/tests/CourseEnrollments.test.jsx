import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { breakpoints } from '@edx/paragon';

import '../../../../__mocks__/reactResponsive.mock';

import { LayoutContext } from '../../../common/layout';
import { CourseEnrollments } from '../CourseEnrollments';

const mockStore = configureMockStore([thunk]);

describe('<CourseEnrollments />', () => {
  const mockFetchCourseEnrollments = jest.fn();
  const mockClearCourseEnrollments = jest.fn();
  const initialProps = {
    courseRuns: {
      'in-progress': [],
      upcoming: [],
      completed: [],
    },
    isLoading: false,
    error: null,
    sidebarComponent: <div className="sidebar-example" />,
    fetchCourseEnrollments: mockFetchCourseEnrollments,
    clearCourseEnrollments: mockClearCourseEnrollments,
  };
  describe('renders course enrollments correctly', () => {
    it('with no course enrollments', () => {
      const pageContext = {
        pageType: 'pages.EnterprisePage',
      };
      const wrapper = mount((
        <LayoutContext.Provider value={{ pageContext }}>
          <CourseEnrollments {...initialProps} />
        </LayoutContext.Provider>
      ));
      expect(wrapper.exists('.course-section')).toBeFalsy();
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
        'in-progress': [{
          ...sampleCourseRun,
          courseRunId: 'course-v1:edX+DemoX+Demo_Course_2',
          courseRunStatus: 'in-progress',
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
        pageType: 'pages.ProgramPage',
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
      const wrapper = mount((
        <Provider store={store}>
          <LayoutContext.Provider value={{ pageContext }}>
            <CourseEnrollments
              {...initialProps}
              courseRuns={courseRuns}
            />
          </LayoutContext.Provider>
        </Provider>
      ));

      expect(wrapper.html()).not.toBeNull();
      expect(wrapper.find('.course-section').length).toEqual(2);
      expect(wrapper.find('.course-section').first().find('.course').length).toEqual(1);
      expect(wrapper.find('.course-section').last().find('.course').length).toEqual(1);
    });

    it('with error', () => {
      const pageContext = {
        pageType: 'pages.EnterprisePage',
      };
      const tree = renderer
        .create((
          <LayoutContext.Provider value={{ pageContext }}>
            <CourseEnrollments
              {...initialProps}
              error={new Error('Network Error')}
            />
          </LayoutContext.Provider>
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with loading', () => {
      const pageContext = {
        pageType: 'pages.EnterprisePage',
      };
      const tree = renderer
        .create((
          <LayoutContext.Provider value={{ pageContext }}>
            <CourseEnrollments
              {...initialProps}
              isLoading
            />
          </LayoutContext.Provider>
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('sidebar', () => {
    let wrapper;

    it('is not shown at screen widths greater than or equal to large breakpoint', () => {
      global.innerWidth = breakpoints.large.minWidth;
      const pageContext = {
        pageType: 'pages.EnterprisePage',
      };
      wrapper = mount((
        <LayoutContext.Provider value={{ pageContext }}>
          <CourseEnrollments {...initialProps} />
        </LayoutContext.Provider>
      ));
      expect(wrapper.find('.sidebar-example').exists()).toBeFalsy();
    });

    it('is shown at screen widths less than large breakpoint', () => {
      global.innerWidth = breakpoints.small.minWidth;
      const pageContext = {
        pageType: 'pages.EnterprisePage',
      };
      wrapper = mount((
        <LayoutContext.Provider value={{ pageContext }}>
          <CourseEnrollments {...initialProps} />
        </LayoutContext.Provider>
      ));
      expect(wrapper.find('.sidebar-example').exists()).toBeTruthy();
    });
  });

  describe('calls appropriate fetch method depending on page type', () => {
    beforeEach(() => {
      mockFetchCourseEnrollments.mockReset();
      mockClearCourseEnrollments.mockReset();
    });

    it('for program page', () => {
      const programUUID = 'test-program-uuid';
      const pageContext = {
        pageType: 'pages.ProgramPage',
        programUUID,
      };
      mount((
        <LayoutContext.Provider value={{ pageContext }}>
          <CourseEnrollments {...initialProps} />
        </LayoutContext.Provider>
      ));
      expect(mockFetchCourseEnrollments.mock.calls.length).toEqual(1);
      expect(mockFetchCourseEnrollments).toBeCalledWith({
        pageType: 'pages.ProgramPage',
        programUUID,
      });
    });

    it('for enterprise page', () => {
      const pageContext = {
        pageType: 'pages.EnterprisePage',
      };
      mount((
        <LayoutContext.Provider value={{ pageContext }}>
          <CourseEnrollments {...initialProps} />
        </LayoutContext.Provider>
      ));
      expect(mockFetchCourseEnrollments.mock.calls.length).toEqual(1);
      expect(mockFetchCourseEnrollments).toBeCalledWith({
        pageType: 'pages.EnterprisePage',
      });
    });
  });
});
