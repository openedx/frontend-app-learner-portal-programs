import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import BaseCourseCard from './BaseCourseCard';

const UpcomingCourseCard = (props) => {
  const { startDate } = props;

  const renderButtonLink = () => (
    <button className="btn btn-light" disabled>
      Available on {moment(startDate).format('MMMM D')}
    </button>
  );

  return (
    <BaseCourseCard buttonLink={renderButtonLink()} {...props} />
  );
};

UpcomingCourseCard.propTypes = {
  startDate: PropTypes.string.isRequired,
};

export default UpcomingCourseCard;