import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { breakpoints } from '@edx/paragon';

import '../../../__mocks__/reactResponsive.mock';

import { PureMainContent } from '../MainContent';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  courseRuns: [],
  loading: false,
  error: null,
});

const MainContentWrapper = props => (
  <Provider store={store}>
    <PureMainContent
      clearProgramEnrollmentOverview={() => {}}
      fetchProgramEnrollmentOverview={() => {}}
      programUUID="test-prgram-uuid"
      {...props}
    />
  </Provider>
);

describe('<MainContent />', () => {
  const baseProps = {
    courseRuns: [
      {
        course_run_id: 'edX+DemoX+Demo_Course',
        display_name: 'edX Demonstration Course',
        resume_course_run_url: 'https://edx.org/',
        course_run_url: 'https://edx.org/',
        start_date: '2017-02-05T05:00:00Z',
        end_date: '2019-08-18T05:00:00Z',
        emails_enabled: true,
        due_dates: [{
          name: 'Assignment 1',
          url: 'https://edx.org',
          date: '2019-05-31T07:50:00Z',
        }, {
          name: 'Assignment 2',
          url: 'https://edx.org',
          date: '2019-06-22T12:00:00Z',
        }],
        micromasters_title: null,
        certificate_generation_url: null,
        status: 'in-progress',
      },
      {
        course_run_id: 'edX+DemoX+Demo_Course_2',
        display_name: 'This Is A Course With A Really Long Name That Should Wrap On Multiple Lines',
        resume_course_run_url: 'https://edx.org/',
        course_run_url: 'https://edx.org/',
        start_date: '2017-02-05T05:00:00Z',
        end_date: '2019-08-18T05:00:00Z',
        emails_enabled: true,
        due_dates: [],
        micromasters_title: null,
        certificate_generation_url: null,
        status: 'in-progress',
      },
      {
        course_run_id: 'edX+DemoX+Demo_Course',
        display_name: 'edX Demonstration Course',
        resume_course_run_url: 'https://edx.org/',
        course_run_url: 'https://edx.org/',
        start_date: '2017-02-05T05:00:00Z',
        end_date: '2018-02-05T05:00:00Z',
        emails_enabled: true,
        upcoming_dates: [],
        micromasters_title: 'MicroMasters® Program in Analytics: Essential Tools and Methods',
        certificate_generation_url: null,
        status: 'completed',
      },
      {
        course_run_id: 'edX+DemoX+Demo_Course',
        display_name: 'edX Demonstration Course',
        resume_course_run_url: 'https://edx.org/',
        course_run_url: 'https://edx.org/',
        start_date: '2019-07-01T05:00:00Z',
        end_date: '2019-12-31T05:00:00Z',
        emails_enabled: true,
        upcoming_dates: [],
        micromasters_title: null,
        certificate_generation_url: null,
        status: 'upcoming',
      },
    ],
  };

  describe('renders correctly', () => {
    it('with no program enrollments course runs data', () => {
      const tree = renderer
        .create((
          <MainContentWrapper />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with program enrollments course runs data', () => {
      const tree = renderer
        .create((
          <MainContentWrapper {...baseProps} />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with error state', () => {
      const tree = renderer
        .create((
          <MainContentWrapper error={Error('Network Error')} />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with loading state', () => {
      const tree = renderer
        .create((
          <MainContentWrapper loading />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('sidebar', () => {
    let wrapper;

    it('is not shown at screen widths greater than or equal to large breakpoint', () => {
      global.innerWidth = breakpoints.large.minWidth;
      wrapper = mount(<MainContentWrapper {...baseProps} />);
      expect(wrapper.find('Sidebar').exists()).toBeFalsy();
    });

    it('is shown at screen widths less than large breakpoint', () => {
      global.innerWidth = breakpoints.small.minWidth;
      wrapper = mount(<MainContentWrapper {...baseProps} />);
      expect(wrapper.find('Sidebar').exists()).toBeTruthy();
    });
  });
});
