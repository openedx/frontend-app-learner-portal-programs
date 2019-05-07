import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BaseCourseCard from './BaseCourseCard';

const CompletedCourseCard = props => (
  <BaseCourseCard hasEmailSettings={false} {...props}>
    <div className="completed row no-gutters">
      <div className="col-12">
        <a className="btn btn-primary btn-xs-block mr-2 mb-2 mb-sm-0" href="/">
          <FontAwesomeIcon className="mr-2" icon={['fas', 'download']} />
          Download Certificate
        </a>
        <a className="btn btn-outline-primary btn-xs-block" href="/">View Course</a>
      </div>
    </div>
  </BaseCourseCard>
);

CompletedCourseCard.propTypes = {
  linkToCourse: PropTypes.string.isRequired,
  grade: PropTypes.shape({
    numericGrade: PropTypes.number.isRequired,
    hasPassed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CompletedCourseCard;
