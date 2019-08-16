import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { breakpoints } from '@edx/paragon';

import '../../../../../__mocks__/reactResponsive.mock';

import { LayoutContext } from '../../../../common/layout';
import ProgramMainContent from '../ProgramMainContent';

const mockStore = configureMockStore([thunk]);

const initialStore = mockStore({
  programCourseEnrollments: {
    courseRuns: [],
    loading: false,
    error: null,
  },
});

const pageContext = {
  programUUID: 'test-program-uuid',
};

describe('<ProgramMainContent />', () => {
  let store = initialStore;

  afterEach(() => {
    store = initialStore;
  });

  describe('renders correctly', () => {
    it('with no program enrollments course runs data', () => {
      const wrapper = mount((
        <Provider store={store}>
          <LayoutContext.Provider value={{ pageContext }}>
            <ProgramMainContent />
          </LayoutContext.Provider>
        </Provider>
      ));
      expect(wrapper.html()).toBeNull();
    });

    it('with program enrollments course runs data', () => {
      const sampleProgramEnrollment = {
        course_run_id: 'course-v1:edX+DemoX+Demo_Course',
        course_run_status: 'completed',
        course_run_url: 'https://edx.org/',
        display_name: 'edX Demonstration Course',
        due_dates: [],
        start_date: '2017-02-05T05:00:00Z',
        end_date: '2018-08-18T05:00:00Z',
      };

      store = mockStore({
        programCourseEnrollments: {
          courseRuns: [sampleProgramEnrollment, {
            ...sampleProgramEnrollment,
            course_run_id: 'course-v1:edX+DemoX+Demo_Course_2',
            display_name: 'edX Demonstration Course 2',
            course_run_status: 'in-progress',
            due_dates: [{
              name: 'Assignment 1',
              url: 'https://edx.org/',
              date: '2019-05-31T07:50:00Z',
            }],
            micromasters_title: 'Example MicroMasters Program',
          }],
        },
      });

      const wrapper = mount((
        <Provider store={store}>
          <LayoutContext.Provider value={{ pageContext }}>
            <ProgramMainContent />
          </LayoutContext.Provider>
        </Provider>
      ));

      expect(wrapper.html()).not.toBeNull();
      expect(wrapper.find('.course-section').length).toEqual(2);
      expect(wrapper.find('.course-section').first().find('.card').length).toEqual(1);
      expect(wrapper.find('.course-section').last().find('.card').length).toEqual(1);
    });

    it('with error state', () => {
      store = mockStore({
        programCourseEnrollments: {
          courseRuns: [],
          loading: false,
          error: new Error('Network Request'),
        },
      });

      const tree = renderer
        .create((
          <Provider store={store}>
            <LayoutContext.Provider value={{ pageContext }}>
              <ProgramMainContent />
            </LayoutContext.Provider>
          </Provider>
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with loading state', () => {
      store = mockStore({
        programCourseEnrollments: {
          courseRuns: [],
          loading: true,
          error: null,
        },
      });

      const tree = renderer
        .create((
          <Provider store={store}>
            <LayoutContext.Provider value={{ pageContext }}>
              <ProgramMainContent />
            </LayoutContext.Provider>
          </Provider>
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('sidebar', () => {
    let wrapper;

    it('is not shown at screen widths greater than or equal to large breakpoint', () => {
      global.innerWidth = breakpoints.large.minWidth;
      wrapper = mount((
        <Provider store={store}>
          <LayoutContext.Provider value={{ pageContext }}>
            <ProgramMainContent />
          </LayoutContext.Provider>
        </Provider>
      ));
      expect(wrapper.find('ProgramSidebar').exists()).toBeFalsy();
    });

    it('is shown at screen widths less than large breakpoint', () => {
      global.innerWidth = breakpoints.small.minWidth;
      wrapper = mount((
        <Provider store={store}>
          <LayoutContext.Provider value={{ pageContext }}>
            <ProgramMainContent />
          </LayoutContext.Provider>
        </Provider>
      ));
      expect(wrapper.find('ProgramSidebar').exists()).toBeTruthy();
    });
  });
});
