import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import CourseSection from '../CourseSection';
import InProgressCourseCard from '../../CourseCard/InProgressCourseCard';

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

describe('<CourseSection />', () => {
  it('does not render section if there are no enrollments', () => {
    const tree = renderer
      .create((
        <CourseSection
          title="Example Title"
          component={InProgressCourseCard}
          enrollments={[]}
        />
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders section if there are enrollments', () => {
    const tree = renderer
      .create((
        <CourseSection
          title="Example Title"
          component={InProgressCourseCard}
          enrollments={[sampleEnrollmentData, {
            ...sampleEnrollmentData,
            course_run_id: 'course-v1:edX+DemoX+Demo_Course_2',
            display_name: 'edX Demonstration Course 2',
          }]}
        />
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('properly handles collapsible behavior', () => {
    const sectionTitle = 'Example Title';
    const enrollments = [sampleEnrollmentData];
    const wrapper = mount((
      <CourseSection
        title={sectionTitle}
        component={InProgressCourseCard}
        enrollments={enrollments}
      />
    ));
    expect(wrapper.state('isOpen')).toBeTruthy();
    expect(wrapper.find('.collapsible-title').text()).toEqual(sectionTitle);

    wrapper.find('.btn-collapsible').first().simulate('click');

    expect(wrapper.state('isOpen')).toBeFalsy();
    expect(wrapper.find('.collapsible-title').text()).toEqual(`${sectionTitle} (${enrollments.length})`);
  });
});
