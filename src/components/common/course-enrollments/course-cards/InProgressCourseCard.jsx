import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { sendTrackEvent } from '@edx/frontend-analytics';

import BaseCourseCard from './BaseCourseCard';
import Notification from './Notification';

import { isFeatureEnabled } from '../../../../common/features';
import { LayoutContext } from '../../layout';

const InProgressCourseCard = (props) => {
  const renderButtons = () => (
    <a
      className="btn btn-outline-primary btn-xs-block"
      href={props.linkToCourse}
      onClick={() => {
        sendTrackEvent('edx.learner_portal.course.continued', {
          course_run_id: props.courseRunId,
        });
      }}
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

  const getDropdownMenuItems = () => {
    const isMoveToCompleteEnabled = isFeatureEnabled('move_to_completed');
    const { pageContext: { pageType } } = useContext(LayoutContext);
    if (!isMoveToCompleteEnabled || pageType !== 'pages.EnterprisePage') {
      return [];
    }
    return [{
      key: 'move-to-completed',
      type: 'button',
      onClick: () => {}, // TODO: noop for now
      children: (
        <>
          Move to completed
          <span className="sr-only">for {props.title}</span>
        </>
      ),
    }];
  };

  return (
    <BaseCourseCard
      type="in_progress"
      buttons={renderButtons()}
      dropdownMenuItems={getDropdownMenuItems()}
      {...props}
    >
      {filteredNotifications.length > 0 && (
        <div className="notifications">
          <ul className="list-unstyled mb-0" aria-label="course due dates" role="alert">
            {filteredNotifications.map(notificationProps => (
              <Notification
                key={`notification-${notificationProps.url}-${notificationProps.date}`}
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
