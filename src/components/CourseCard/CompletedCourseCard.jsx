import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BaseCourseCard from './BaseCourseCard';

import './CompletedCourseCard.scss';

const CompletedCourseCard = (props) => {
  const { linkToCourse } = props;

  const renderButtonLink = () => (
    <a href={linkToCourse} className="btn btn-outline-dark">
      View Course
    </a>
  );

  const getFinalGrade = () => {
    const { grade: { hasPassed, numericGrade } } = props;
    const percentGrade = Math.round(numericGrade * 100);
    return (
      <span>
        {percentGrade}%
        {hasPassed && ' - Passed'}
      </span>
    );
  };

  return (
    <BaseCourseCard
      buttonLink={renderButtonLink()}
      hasEmailSettings={false}
      {...props}
    >
      <div className="completed row no-gutters">
        <div className="col-6">
          <p className="card-text font-weight-bold">
            Final Grade: {getFinalGrade()}
          </p>
          <button className="btn btn-sm btn-block btn-light text-left text-muted px-2 py-2 border">
            <FontAwesomeIcon className="mr-2" icon="file" />
            Download Certifcate
          </button>
        </div>
      </div>
    </BaseCourseCard>
  );
};

CompletedCourseCard.propTypes = {
  linkToCourse: PropTypes.string.isRequired,
  grade: PropTypes.shape({
    numericGrade: PropTypes.number.isRequired,
    hasPassed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CompletedCourseCard;
