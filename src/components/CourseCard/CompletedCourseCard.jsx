import React from 'react';
import PropTypes from 'prop-types';

import BaseCourseCard from './BaseCourseCard';

const CompletedCourseCard = (props) => {
  const renderButtons = () => (
    <>
      <a
        className="btn btn-block btn-outline-primary btn-course-link mb-2"
        href={props.linkToCourse}
      >
        View Course
      </a>
      <a
        className="btn btn-block btn-outline-primary btn-course-link"
        href={props.linkToCourse}
      >
        View Certificate
      </a>
    </>
  );

  return (
    <BaseCourseCard
      buttons={renderButtons()}
      hasEmailSettings={false}
      {...props}
    />
  );
};

CompletedCourseCard.propTypes = {
  linkToCourse: PropTypes.string.isRequired,
};

export default CompletedCourseCard;
