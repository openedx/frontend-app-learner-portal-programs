import React from 'react';
import PropTypes from 'prop-types';
import { sendTrackEvent } from '@edx/frontend-analytics';

import BaseCourseCard from './BaseCourseCard';

const CompletedCourseCard = (props) => {
  const renderButtons = () => (
    <>
      <a
        className="btn btn-outline-primary btn-course-link btn-xs-block mr-md-2 mb-2 mb-md-0"
        href={props.linkToCourse}
        onClick={() => { sendTrackEvent('edx.learner_portal.completed_course.viewed', { course_run_id: props.courseRunId }); }}
      >
        View Course
        <span className="sr-only">for {props.title}</span>
      </a>
      {props.linkToCertificate && (
        <a
          className="btn btn-outline-primary btn-xs-block btn-course-link"
          href={props.linkToCertificate}
          onClick={() => { sendTrackEvent('edx.learner_portal.certificate.viewed', { course_run_id: props.courseRunId }); }}
        >
          View Certificate
          <span className="sr-only">for {props.title}</span>
        </a>
      )}
    </>
  );

  return (
    <BaseCourseCard
      buttons={renderButtons()}
      {...props}
    />
  );
};

CompletedCourseCard.propTypes = {
  linkToCourse: PropTypes.string.isRequired,
  linkToCertificate: PropTypes.string,
  courseRunId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

CompletedCourseCard.defaultProps = {
  linkToCertificate: null,
};

export default CompletedCourseCard;
