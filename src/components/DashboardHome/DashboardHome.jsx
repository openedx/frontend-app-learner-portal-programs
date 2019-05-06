import React from 'react';

import Hero from '../Hero/Hero';
import CourseSection from '../CourseSection/CourseSection';
import InProgressCourseCard from '../CourseCard/InProgressCourseCard';
import UpcomingCourseCard from '../CourseCard/UpcomingCourseCard';
import CompletedCourseCard from '../CourseCard/CompletedCourseCard';

import sampleApiResponse from './sampleApiResponse';

import './DashboardHome.scss';

class DashboardHome extends React.Component {
  state = {
    courses: {
      'in-progress': [],
      upcoming: [],
      completed: [],
    },
    // Temporarily adds `isProgramEnrollmentsLoading` to state to simulate loading
    // state. Once we are actually calling the API and have Redux set up, this should
    // come from props instead of state.
    isProgramEnrollmentsLoading: true,
  };

  componentDidMount() {
    this.groupCourseEnrollmentsByStatus();

    // Temporarily simulate loading by resetting `isProgramEnrollmentsLoading` to false
    // after 2 seconds.
    setTimeout(() => {
      this.setState({
        isProgramEnrollmentsLoading: false,
      });
    }, 2000);
  }

  groupCourseEnrollmentsByStatus = () => {
    const { course_runs: courseRuns } = sampleApiResponse;

    this.setState({
      courses: {
        'in-progress': courseRuns.filter(courseRun => courseRun.status === 'in-progress'),
        upcoming: courseRuns.filter(courseRun => courseRun.status === 'upcoming'),
        completed: courseRuns.filter(courseRun => courseRun.status === 'completed'),
      },
    });
  }

  render() {
    const { courses, isProgramEnrollmentsLoading } = this.state;

    return (
      <>
        <Hero
          programTitle="Master's Degree in Analytics"
          organizationLogo={{
            url: 'https://www.edx.org/sites/default/files/school/image/logo/gtx-logo-200x101.png',
            alt: 'Georgia Tech Institute of Technology logo',
          }}
          textureImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt-cyber-title_bg_img_440x400.jpg"
          coverImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt_cyber_campus_image_1000x400.jpg"
        />
        <div className="container py-5">
          <div className="row">
            <div className="col-xs-12 col-lg-8">
              {isProgramEnrollmentsLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <div className="spinner-border text-primary" role="status">
                    <div className="sr-only">Loading program enrollments...</div>
                  </div>
                </div>
              ) : (
                <>
                  <CourseSection
                    title="My Courses In Progress"
                    component={InProgressCourseCard}
                    enrollments={courses['in-progress']}
                  />
                  <CourseSection
                    title="Upcoming Courses"
                    component={UpcomingCourseCard}
                    enrollments={courses.upcoming}
                  />
                  <CourseSection
                    title="Completed Courses"
                    component={CompletedCourseCard}
                    enrollments={courses.completed}
                  />
                </>
              )}
            </div>
            <div className="col">
              <p>Sidebar Content</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DashboardHome;
