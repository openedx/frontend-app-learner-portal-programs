import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { breakpoints, Alert } from '@edx/paragon';
import { Warning, CheckCircle } from '@edx/paragon/icons';
import { AppContext } from '@edx/frontend-platform/react';
import MediaQuery from 'react-responsive';
import { LoadingSpinner } from '../loading-spinner';

import CourseSection from './CourseSection';
import {
  InProgressCourseCard,
  UpcomingCourseCard,
  CompletedCourseCard,
} from './course-cards';

import * as selectors from './data/selectors';
import * as actions from './data/actions';

export class CourseEnrollments extends Component {
  componentDidMount() {
    const {
      pageContext: {
        programUUID,
      },
    } = this.context;
    const { fetchCourseEnrollments } = this.props;
    const options = {};
    if (programUUID) {
      options.programUUID = programUUID;
    }
    fetchCourseEnrollments(options);
  }

  componentWillUnmount() {
    const { clearCourseEnrollments } = this.props;
    clearCourseEnrollments();
  }

  hasCourseRunsWithStatus = (status) => {
    const { courseRuns } = this.props;
    return courseRuns && courseRuns[status] && courseRuns[status].length > 0;
  }

  hasCourseRuns = () => (
    this.hasCourseRunsWithStatus('completed')
    || this.hasCourseRunsWithStatus('in_progress')
    || this.hasCourseRunsWithStatus('upcoming')
  )

  renderError = () => (
    <Alert
      variant="danger"
      dismissible={false}
      icon={Warning}
      show
    >
      <div className="d-flex">
        An error occurred while retrieving your course enrollments. Please try again.
      </div>
    </Alert>
  );

  renderMarkCourseCompleteSuccessAlert = () => {
    const { modifyIsMarkCourseCompleteSuccess } = this.props;
    return (
      <Alert
        variant="success"
        icon={CheckCircle}
        onClose={() => {
          modifyIsMarkCourseCompleteSuccess({ isSuccess: false });
        }}
        show
        dismissible
      >
        <div className="d-flex">
          Your course was marked as complete.
        </div>
      </Alert>
    );
  };

  render() {
    const {
      children,
      courseRuns,
      isLoading,
      error,
      sidebarComponent,
      isMarkCourseCompleteSuccess,
    } = this.props;

    if (isLoading) {
      return <LoadingSpinner screenReaderText="loading course enrollments" />;
    } if (error) {
      return this.renderError();
    }

    return (
      <>
        {isMarkCourseCompleteSuccess && this.renderMarkCourseCompleteSuccessAlert()}
        {/*
          Only render children if there are no course runs.
          This allows the parent component to customize what
          gets displayed if the user does not have any course runs.
        */}
        {!this.hasCourseRuns() && children}
        <CourseSection
          title="My courses in progress"
          component={InProgressCourseCard}
          courseRuns={courseRuns.in_progress}
        />
        <MediaQuery minWidth={breakpoints.large.minWidth}>
          {matches => !matches && (
            <div className="mb-5">
              {sidebarComponent}
            </div>
          )}
        </MediaQuery>
        <CourseSection
          title="Upcoming courses"
          component={UpcomingCourseCard}
          courseRuns={courseRuns.upcoming}
        />
        <CourseSection
          title="Completed courses"
          component={CompletedCourseCard}
          courseRuns={courseRuns.completed}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  courseRuns: selectors.getCourseRunsByStatus(state),
  isLoading: selectors.getIsLoading(state),
  error: selectors.getError(state),
  isMarkCourseCompleteSuccess: selectors.getIsMarkCourseCompleteSuccess(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCourseEnrollments: (options) => {
    dispatch(actions.fetchCourseEnrollments(options));
  },
  clearCourseEnrollments: () => {
    dispatch(actions.clearCourseEnrollments());
  },
  modifyIsMarkCourseCompleteSuccess: (options) => {
    dispatch(actions.updateIsMarkCourseCompleteSuccess(options));
  },
});

CourseEnrollments.contextType = AppContext;

CourseEnrollments.propTypes = {
  fetchCourseEnrollments: PropTypes.func.isRequired,
  clearCourseEnrollments: PropTypes.func.isRequired,
  courseRuns: PropTypes.shape({
    in_progress: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    upcoming: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    completed: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  sidebarComponent: PropTypes.element.isRequired,
  isMarkCourseCompleteSuccess: PropTypes.bool.isRequired,
  modifyIsMarkCourseCompleteSuccess: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Error),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

CourseEnrollments.defaultProps = {
  error: null,
  children: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseEnrollments);
