import React from 'react';
import PropTypes from 'prop-types';

const CourseSection = (props) => {
  const { component: Component, enrollments, title } = props;

  if (enrollments.length > 0) {
    return (
      <div className="course-section">
        <h2 className="mb-4">{title}</h2>
        {enrollments.map((courseData) => {
          const { status } = courseData;
          const defaultCardProps = {
            title: courseData.display_name,
            microMastersTitle: courseData.micromasters_title,
          };
          const cardProps = {};
          switch (status) {
            case 'in-progress':
              cardProps.endDate = courseData.end_date;
              cardProps.linkToCourse = courseData.resume_course_run_url;
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
      </div>
    );
  }

  return null;
};

CourseSection.propTypes = {
  component: PropTypes.element.isRequired,
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
