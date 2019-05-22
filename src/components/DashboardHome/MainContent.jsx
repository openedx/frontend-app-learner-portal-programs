import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { breakpoints } from '@edx/paragon';

import CourseSection from '../CourseSection/CourseSection';
import InProgressCourseCard from '../CourseCard/InProgressCourseCard';
import UpcomingCourseCard from '../CourseCard/UpcomingCourseCard';
import CompletedCourseCard from '../CourseCard/CompletedCourseCard';
import Sidebar from './Sidebar';

import sampleApiResponse from './sampleApiResponse';

class MainContent extends Component {
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
            <MediaQuery minWidth={breakpoints.large.minWidth}>
              {matches => !matches && (
                <div className="mb-5">
                  <Sidebar />
                </div>
              )}
            </MediaQuery>
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
      </>
    );
  }
}

export default MainContent;
