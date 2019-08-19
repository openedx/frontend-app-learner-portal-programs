import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { breakpoints, StatusAlert } from '@edx/paragon';

import CourseSection from './CourseSection';
import { InProgressCourseCard, UpcomingCourseCard, CompletedCourseCard } from './course-cards';
import Sidebar from '../sidebar/Sidebar';

import {
  fetchProgramCourseEnrollments,
  clearProgramCourseEnrollments,
} from './data/actions';

class MainContent extends Component {
  componentDidMount() {
    const { programUUID } = this.props;
    this.props.fetchProgramCourseEnrollments(programUUID);
  }

  componentWillUnmount() {
    this.props.clearProgramCourseEnrollments();
  }

  groupCourseEnrollmentsByStatus = () => {
    const { courseRuns } = this.props;

    const enrollments = {
      'in-progress': [],
      upcoming: [],
      completed: [],
    };

    if (courseRuns && courseRuns.length > 0) {
      enrollments['in-progress'] = courseRuns.filter(courseRun => courseRun.course_run_status === 'in-progress');
      enrollments.upcoming = courseRuns.filter(courseRun => courseRun.course_run_status === 'upcoming');
      enrollments.completed = courseRuns.filter(courseRun => courseRun.course_run_status === 'completed');
    }

    return enrollments;
  }

  renderError() {
    return (
      <StatusAlert
        alertType="danger"
        dialog={
          <div className="d-flex">
            <div>
              <FontAwesomeIcon className="mr-2" icon={faExclamationTriangle} />
            </div>
            <div>
              An error occurred while retrieving your program enrollments. Please try again.
            </div>
          </div>
        }
        dismissible={false}
        open
      />
    );
  }

  render() {
    const { error, loading, programDocuments } = this.props;

    if (error) {
      return this.renderError();
    }

    const courses = this.groupCourseEnrollmentsByStatus();

    return (
      <>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <div className="sr-only">Loading program enrollments...</div>
            </div>
          </div>
        ) : (
          <>
            <CourseSection
              title="My Courses"
              component={InProgressCourseCard}
              enrollments={courses['in-progress']}
            />
            <MediaQuery minWidth={breakpoints.large.minWidth}>
              {matches => !matches && (
                <aside className="mb-5">
                  <Sidebar programDocuments={programDocuments} />
                </aside>
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

MainContent.defaultProps = {
  courseRuns: [],
  loading: false,
  error: null,
  programDocuments: null,
};

MainContent.propTypes = {
  fetchProgramCourseEnrollments: PropTypes.func.isRequired,
  clearProgramCourseEnrollments: PropTypes.func.isRequired,
  programUUID: PropTypes.string.isRequired,
  programDocuments: PropTypes.shape({
    display: PropTypes.bool,
    header: PropTypes.string,
    documents: PropTypes.arrayOf(PropTypes.shape({
      display_text: PropTypes.string,
      document: PropTypes.string,
    })),
  }),
  courseRuns: PropTypes.arrayOf(PropTypes.shape({
    course_run_id: PropTypes.string.isRequired,
    course_run_status: PropTypes.string.isRequired,
    course_run_url: PropTypes.string.isRequired,
    resume_course_run_url: PropTypes.string,
    display_name: PropTypes.string.isRequired,
    due_dates: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })).isRequired,
    emails_enabled: PropTypes.bool,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    micromasters_title: PropTypes.string,
    certificate_download_url: PropTypes.string,
  })),
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
};

const mapStateToProps = state => ({
  loading: state.programCourseEnrollments.loading,
  error: state.programCourseEnrollments.error,
  courseRuns: state.programCourseEnrollments.courseRuns,
});

const mapDispatchToProps = dispatch => ({
  fetchProgramCourseEnrollments: (programUUID) => {
    dispatch(fetchProgramCourseEnrollments(programUUID));
  },
  clearProgramCourseEnrollments: () => {
    dispatch(clearProgramCourseEnrollments());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
