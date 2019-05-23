import React from 'react';
import PropTypes from 'prop-types';
import { Collapsible } from '@edx/paragon';
import { faChevronCircleUp, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InProgressCourseCard from '../CourseCard/InProgressCourseCard';
import UpcomingCourseCard from '../CourseCard/UpcomingCourseCard';
import CompletedCourseCard from '../CourseCard/CompletedCourseCard';

import './CourseSection.scss';

class CourseSection extends React.Component {
  state = {
    isOpen: true,
  };

  getFormattedTitle = () => {
    const { isOpen } = this.state;
    const { enrollments, title } = this.props;

    if (!isOpen) {
      return `${title} (${enrollments.length})`;
    }

    return title;
  };

  handleCollapsibleToggle = (isOpen) => {
    this.setState({
      isOpen,
    });
  };

  render() {
    const { component: Component, enrollments } = this.props;

    if (enrollments.length > 0) {
      return (
        <div className="course-section mb-5">
          <Collapsible
            title={this.getFormattedTitle()}
            onToggle={this.handleCollapsibleToggle}
            icons={{
              expanded: <FontAwesomeIcon className="text-primary" icon={faChevronCircleUp} />,
              collapsed: <FontAwesomeIcon className="text-primary" icon={faChevronCircleDown} />,
            }}
            isOpen
          >
            {enrollments.map((courseData) => {
              const { status } = courseData;
              const defaultCardProps = {
                key: courseData.course_run_id,
                title: courseData.display_name,
                microMastersTitle: courseData.micromasters_title,
              };
              const cardProps = {};
              switch (status) {
                case 'in-progress':
                  cardProps.endDate = courseData.end_date;
                  cardProps.linkToCourse = courseData.resume_course_run_url;
                  cardProps.notifications = courseData.due_dates;
                  break;
                case 'upcoming':
                  cardProps.startDate = courseData.start_date;
                  cardProps.linkToCourse = courseData.course_run_url;
                  break;
                case 'completed':
                  cardProps.endDate = courseData.end_date;
                  cardProps.linkToCourse = courseData.course_run_url;
                  break;
                default:
                  break;
              }
              return <Component {...defaultCardProps} {...cardProps} />;
            })}
          </Collapsible>
        </div>
      );
    }

    return null;
  }
}

CourseSection.propTypes = {
  component: PropTypes.oneOf([
    InProgressCourseCard,
    UpcomingCourseCard,
    CompletedCourseCard,
  ]).isRequired,
  enrollments: PropTypes.arrayOf(PropTypes.shape({
    display_name: PropTypes.string.isRequired,
    micromasters_title: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    resume_course_run_url: PropTypes.string,
    course_run_url: PropTypes.string,
  })).isRequired,
  title: PropTypes.string.isRequired,
};

export default CourseSection;
