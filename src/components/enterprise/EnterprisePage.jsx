import React from 'react';

import { Layout, withAuthentication } from '../common';
import { MainContent, Sidebar, SidebarBlock } from '../common/Layout';
import CourseSection from '../common/CourseSection';
import { InProgressCourseCard, CompletedCourseCard, UpcomingCourseCard } from '../common/course-cards';
import Offer from './Offer';
import Hero from './Hero';

const EnterprisePage = props => (
  <Layout pageContext={props.pageContext}>
    <>
      <Hero />
      <div className="container py-5">
        <div className="row">
          <MainContent>
            <CourseSection
              title="My Courses"
              component={InProgressCourseCard}
              enrollments={[
                {
                  course_run_id: 'course-v1:edX+DemoX+Demo_Course',
                  course_run_status: 'in_progress',
                  course_run_url: 'http://localhost:18000/courses/course-v1:edX+DemoX+Demo_Course/course/',
                  display_name: 'edX Demonstration Course',
                  due_dates: [],
                  end_date: '2019-03-23T00:00:00Z',
                  start_date: '2013-02-05T05:00:00Z',
                  organization: 'University Y',
                },
              ]}
            />
            <CourseSection
              title="Upcoming Courses"
              component={UpcomingCourseCard}
              enrollments={[
                {
                  course_run_id: 'course-v1:edX+DemoX+Demo_Course',
                  course_run_status: 'upcoming',
                  course_run_url: 'http://localhost:18000/courses/course-v1:edX+DemoX+Demo_Course/course/',
                  display_name: 'edX Demonstration Course',
                  due_dates: [],
                  end_date: '2019-03-23T00:00:00Z',
                  start_date: '2013-02-05T05:00:00Z',
                  organization: 'University X',
                },
              ]}
            />
            <CourseSection
              title="Completed Courses"
              component={CompletedCourseCard}
              enrollments={[
                {
                  course_run_id: 'course-v1:edX+DemoX+Demo_Course',
                  course_run_status: 'completed',
                  course_run_url: 'http://localhost:18000/courses/course-v1:edX+DemoX+Demo_Course/course/',
                  display_name: 'edX Demonstration Course',
                  due_dates: [],
                  end_date: '2019-03-23T00:00:00Z',
                  start_date: '2013-02-05T05:00:00Z',
                },
              ]}
            />
          </MainContent>
          <Sidebar>
            <SidebarBlock title={`Offers from ${props.pageContext.enterpriseName}`}>
              <Offer
                title="Example offer 1"
                expires="2019-09-01"
                link="https://edx.org"
              />
              <Offer
                title="Example offer 2"
                expires="2019-10-01"
                link="https://edx.org"
              />
            </SidebarBlock>
          </Sidebar>
        </div>
      </div>
    </>
  </Layout>
);

export default withAuthentication(EnterprisePage);
