import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import * as analytics from '@edx/frontend-analytics';
import CourseSection from '../CourseSection';
import InProgressCourseCard from '../../CourseCard/InProgressCourseCard';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const sampleEnrollmentData = {
  course_run_id: 'course-v1:edX+DemoX+Demo_Course',
  course_run_status: 'in_progress',
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
};

const CourseSectionWrapper = props => (
  <Provider store={store}>
    <CourseSection {...props} />
  </Provider>
);

describe('<CourseSection />', () => {
  it('does not render section if there are no enrollments', () => {
    const wrapper = mount((
      <CourseSectionWrapper
        title="Example Title"
        component={InProgressCourseCard}
        enrollments={[]}
      />
    ));
    expect(wrapper.html()).toEqual(null);
  });

  it('renders section if there are enrollments', () => {
    const wrapper = mount((
      <CourseSectionWrapper
        title="Example Title"
        component={InProgressCourseCard}
        enrollments={[sampleEnrollmentData, {
          ...sampleEnrollmentData,
          course_run_id: 'course-v1:edX+DemoX+Demo_Course_2',
          display_name: 'edX Demonstration Course 2',
        }]}
      />
    ));
    expect(wrapper.html()).not.toEqual(null);
  });

  it('properly handles collapsible behavior', () => {
    const sectionTitle = 'Example Title';
    const enrollments = [sampleEnrollmentData];
    analytics.sendTrackEvent = jest.fn();
    const wrapper = mount((
      <CourseSectionWrapper
        title={sectionTitle}
        component={InProgressCourseCard}
        enrollments={enrollments}
      />
    ));

    expect(wrapper.find('.collapsible-title').text()).toEqual(sectionTitle);
    wrapper.find('.btn-collapsible').first().simulate('click');
    expect(analytics.sendTrackEvent).toHaveBeenCalled();
    expect(wrapper.find('.collapsible-title').text()).toEqual(`${sectionTitle} (${enrollments.length})`);
  });
});
