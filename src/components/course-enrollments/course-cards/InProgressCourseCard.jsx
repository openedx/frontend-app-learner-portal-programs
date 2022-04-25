import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';

import BaseCourseCard from './BaseCourseCard';
import Notification from './Notification';

import {
  updateCourseRunStatus,
} from '../data/actions';

function InProgressCourseCard({
  linkToCourse,
  courseRunId,
  title,
  notifications,
  modifyCourseRunStatus,
  ...rest
}) {
  const renderButtons = () => (
    <a
      className="btn btn-outline-primary btn-xs-block"
      href={linkToCourse}
      onClick={() => {
        sendTrackEvent('edx.learner_portal.course.continued', {
          course_run_id: courseRunId,
        });
      }}
    >
      Continue Learning
      <span className="sr-only">for {title}</span>
    </a>
  );

  const filteredNotifications = notifications.filter((notification) => {
    const now = moment();
    if (moment(notification.date).isBetween(now, moment(now).add('1', 'w'))) {
      return notification;
    }
    return false;
  });

  const renderNotifications = () => {
    if (!filteredNotifications.length) {
      return null;
    }
    return (
      <div className="notifications mb-3">
        <ul
          className="list-unstyled mb-0"
          aria-label="course due dates"
        >
          {filteredNotifications.map(notificationProps => (
            <Notification
              key={`notification-${notificationProps.url}-${notificationProps.date}`}
              courseRunId={courseRunId}
              {...notificationProps}
            />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <BaseCourseCard
      type="in_progress"
      buttons={renderButtons()}
      title={title}
      linkToCourse={linkToCourse}
      courseRunId={courseRunId}
      {...rest}
    >
      {renderNotifications()}
    </BaseCourseCard>
  );
}

InProgressCourseCard.propTypes = {
  linkToCourse: PropTypes.string.isRequired,
  courseRunId: PropTypes.string.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
  modifyCourseRunStatus: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  modifyCourseRunStatus: (options) => {
    dispatch(updateCourseRunStatus(options));
  },
});

export default connect(null, mapDispatchToProps)(InProgressCourseCard);
