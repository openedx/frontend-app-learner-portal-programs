import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { useStaticQuery, graphql } from 'gatsby';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { breakpoints, StatusAlert } from '@edx/paragon';

import CourseSection from '../CourseSection/CourseSection';
import InProgressCourseCard from '../CourseCard/InProgressCourseCard';
import UpcomingCourseCard from '../CourseCard/UpcomingCourseCard';
import CompletedCourseCard from '../CourseCard/CompletedCourseCard';
import Sidebar from './Sidebar';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          programUUID
        }
      }
    }
  `);
  return site.siteMetadata;
};

export class PureMainContent extends Component {
  componentDidMount() {
    const { programUUID } = this.props;
    this.props.fetchProgramEnrollmentOverview(programUUID);
  }

  componentWillUnmount() {
    this.props.clearProgramEnrollmentOverview();
  }

  groupCourseEnrollmentsByStatus = () => {
    const { courseRuns } = this.props;
    return {
      'in-progress': courseRuns.filter(courseRun => courseRun.status === 'in-progress'),
      upcoming: courseRuns.filter(courseRun => courseRun.status === 'upcoming'),
      completed: courseRuns.filter(courseRun => courseRun.status === 'completed'),
    };
  }

  renderError() {
    return (<StatusAlert
      alertType="danger"
      dialog={
        <div className="d-flex">
          <div>
            <FontAwesomeIcon className="mr-3" icon={faExclamationTriangle} />
          </div>
          <div>
            An error occurred while retrieving program enrolments data. Please try again.
          </div>
        </div>
      }
      dismissible={false}
      open
    />);
  }

  render() {
    const { error, loading } = this.props;
    const courses = this.groupCourseEnrollmentsByStatus();

    if (error) {
      return this.renderError();
    }

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

PureMainContent.defaultProps = {
  courseRuns: [],
  loading: false,
  error: null,
};

PureMainContent.propTypes = {
  fetchProgramEnrollmentOverview: PropTypes.func.isRequired,
  clearProgramEnrollmentOverview: PropTypes.func.isRequired,
  programUUID: PropTypes.string.isRequired,
  courseRuns: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
};

export default (props) => {
  const { programUUID } = useSiteMetadata();
  return <PureMainContent programUUID={programUUID} {...props} />;
};
