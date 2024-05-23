import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from '@openedx/paragon';

import BaseCourseCard from './BaseCourseCard';

function UpcomingCourseCard(props) {
  const renderButtons = () => (
    <Button variant="light" className="btn-xs-block" disabled>
      Available on {moment(props.startDate).format('MMM D')}
    </Button>
  );

  return (
    <BaseCourseCard type="upcoming" buttons={renderButtons()} {...props} />
  );
}

UpcomingCourseCard.propTypes = {
  startDate: PropTypes.string.isRequired,
};

export default UpcomingCourseCard;
