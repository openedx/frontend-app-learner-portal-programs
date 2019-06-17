import React from 'react';
import { StaticQuery } from 'gatsby';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { breakpoints } from '@edx/paragon';

import '../../../__mocks__/reactResponsive.mock';

import MainContent from '../MainContent';

const mockStore = configureMockStore([thunk]);

const initialStore = mockStore({
  programEnrollments: {
    courseRuns: [],
    loading: false,
    error: null,
  },
});

describe('<MainContent />', () => {
  const baseProps = {
    courseRuns: [
      {
        course_run_id: 'course-v1:edX+DemoX+Demo_Course',
        course_run_status: 'completed',
        course_run_url: 'https://edx.org/',
        display_name: 'edX Demonstration Course',
        due_dates: [{
          name: 'Assignment 1',
          url: 'https://edx.org/',
          date: '2019-05-31T07:50:00Z',
        }],
        start_date: '2017-02-05T05:00:00Z',
        end_date: '2019-08-18T05:00:00Z',
        micromasters_title: null,
      },
    ],
  };

  let store = initialStore;

  beforeEach(() => {
    StaticQuery.mockImplementationOnce(({ render }) => (
      render({
        site: {
          siteMetadata: {
            programUUID: 'test-program-uuid',
          },
        },
      })
    ));
  });

  afterEach(() => {
    store = initialStore;
  });

  describe('renders correctly', () => {
    it('with no program enrollments course runs data', () => {
      const tree = renderer
        .create((
          <MainContent store={store} />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
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
        micromasters_title: null,
      };

      store = mockStore({
        programEnrollments: {
          courseRuns: [sampleProgramEnrollment, {
            ...sampleProgramEnrollment,
            course_run_id: 'course-v1:edX+DemoX+Demo_Course_2',
            course_run_status: 'in_progress',
            due_dates: [{
              name: 'Assignment 1',
              url: 'https://edx.org/',
              date: '2019-05-31T07:50:00Z',
            }],
            micromasters_title: 'Example MicroMasters Program',
          }],
        },
      });
      const tree = renderer
        .create((
          <MainContent store={store} {...baseProps} />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with error state', () => {
      store = mockStore({
        programEnrollments: {
          courseRuns: [],
          loading: false,
          error: new Error('Network Request'),
        },
      });

      const tree = renderer
        .create((
          <MainContent store={store} />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with loading state', () => {
      store = mockStore({
        programEnrollments: {
          courseRuns: [],
          loading: true,
          error: null,
        },
      });

      const tree = renderer
        .create((
          <MainContent store={store} />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('sidebar', () => {
    let wrapper;

    it('is not shown at screen widths greater than or equal to large breakpoint', () => {
      global.innerWidth = breakpoints.large.minWidth;
      wrapper = mount(<MainContent store={store} {...baseProps} />);
      expect(wrapper.find('Sidebar').exists()).toBeFalsy();
    });

    it('is shown at screen widths less than large breakpoint', () => {
      global.innerWidth = breakpoints.small.minWidth;
      wrapper = mount(<MainContent store={store} {...baseProps} />);
      expect(wrapper.find('Sidebar').exists()).toBeTruthy();
    });
  });
});
