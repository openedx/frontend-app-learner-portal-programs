import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MediaQuery from 'react-responsive';
import { breakpoints, StatusAlert } from '@edx/paragon';

import { LayoutContext } from '../layout';
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
  static contextType = LayoutContext;

  componentDidMount() {
    const {
      pageContext: {
        pageType,
        programUUID, // for Masters, empty for Enterprise
      },
    } = this.context;
    const { fetchCourseEnrollments } = this.props;
    const options = { pageType };
    if (pageType === 'pages.ProgramPage') {
      options.programUUID = programUUID;
    }
    fetchCourseEnrollments(options);
  }

  componentWillUnmount() {
    const { clearCourseEnrollments } = this.props;
    clearCourseEnrollments();
  }

  renderError = () => (
    <StatusAlert
      alertType="danger"
      dialog={
        <div className="d-flex">
          <div>
            <FontAwesomeIcon className="mr-2" icon={faExclamationTriangle} />
          </div>
          <div>
            An error occurred while retrieving your course enrollments. Please try again.
          </div>
        </div>
      }
      dismissible={false}
      open
    />
  );

  render() {
    const {
      courseRuns,
      isLoading,
      error,
      sidebarComponent,
    } = this.props;

    if (isLoading) {
      return <LoadingSpinner screenReaderText="loading course enrollments" />;
    } else if (error) {
      return this.renderError();
    }
    return (
      <>
        <CourseSection
          title="My courses in progress"
          component={InProgressCourseCard}
          courseRuns={courseRuns.inProgress}
        />
        <MediaQuery minWidth={breakpoints.large.minWidth}>
          {matches => !matches && (
            <aside className="mb-5">
              {sidebarComponent}
            </aside>
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
});

const mapDispatchToProps = dispatch => ({
  fetchCourseEnrollments: (options) => {
    dispatch(actions.fetchCourseEnrollments(options));
  },
  clearCourseEnrollments: () => {
    dispatch(actions.clearCourseEnrollments());
  },
});

CourseEnrollments.propTypes = {
  fetchCourseEnrollments: PropTypes.func.isRequired,
  clearCourseEnrollments: PropTypes.func.isRequired,
  courseRuns: PropTypes.shape({
    inProgress: PropTypes.array.isRequired,
    upcoming: PropTypes.array.isRequired,
    completed: PropTypes.array.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  sidebarComponent: PropTypes.element.isRequired,
  error: PropTypes.instanceOf(Error),
};

CourseEnrollments.defaultProps = {
  error: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseEnrollments);
