import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { sendTrackEvent } from '@edx/frontend-analytics';

import BaseCourseCard from './BaseCourseCard';
import Notification from './Notification';

const InProgressCourseCard = (props) => {
  const renderButtons = () => (
    <a
      className="btn btn-primary btn-block"
      href={props.linkToCourse}
      onClick={() => { sendTrackEvent('edx.learner_portal.course.continued', { course_run_id: props.courseRunId }); }}
    >
      Continue Learning
      <span className="sr-only">for {props.title}</span>
    </a>
  );

  const filteredNotifications = props.notifications.filter((notification) => {
    const now = moment();
    if (moment(notification.date).isBetween(now, moment(now).add('1', 'w'))) {
      return notification;
    }
    return false;
  });

  return (
    <BaseCourseCard buttons={renderButtons()} {...props}>
      {filteredNotifications.length > 0 && (
        <div className="notifications">
          <ul className="list-unstyled" aria-label="course due dates" role="alert">
            {filteredNotifications.map(notificationProps => (
              <Notification
                key={notificationProps}
                courseRunId={props.courseRunId}
                {...notificationProps}
              />
            ))}
          </ul>
        </div>
      )}
    </BaseCourseCard>
  );
};

InProgressCourseCard.propTypes = {
  linkToCourse: PropTypes.string.isRequired,
  courseRunId: PropTypes.string.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
};

export default InProgressCourseCard;
