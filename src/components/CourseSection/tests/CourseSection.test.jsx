import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import CourseSection from '../CourseSection';
import InProgressCourseCard from '../../CourseCard/InProgressCourseCard';

const sampleEnrollmentData = {
  course_run_id: 'edX+DemoX+Demo_Course',
  display_name: 'edX Demonstration Course',
  resume_course_run_url: 'https://edx.org/',
  course_run_url: 'https://edx.org/',
  start_date: '2017-02-05T05:00:00Z',
  end_date: '2019-08-18T05:00:00Z',
  emails_enabled: true,
  due_dates: [],
  micromasters_title: null,
  certificate_generation_url: null,
  status: 'in-progress',
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
            course_run_id: 'edX+DemoX+Demo_Course_2',
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
