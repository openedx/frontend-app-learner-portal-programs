import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { sendTrackEvent } from '@edx/frontend-analytics';

import BaseCourseCard from './BaseCourseCard';
import { MarkCompleteModal } from './mark-complete-modal';
import Notification from './Notification';

import { LayoutContext } from '../../layout';
import { camelCaseObject } from '../../../../common/utils';

const InProgressCourseCard = ({
  linkToCourse,
  courseRunId,
  title,
  notifications,
  ...rest
}) => {
  const { pageContext: { pageType } } = useContext(LayoutContext);
  const [isMarkCompleteModalOpen, setIsMarkCompleteModalOpen] = useState(false);

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

  const getDropdownMenuItems = () => {
    // TODO: We should try to avoid this sort of conditional logic based on
    // `pageType`. Instead, ideally, we'd be able to pull the dropdown
    // menu items from a parent component's context or pass them down the
    // component tree.
    if (pageType !== 'pages.EnterprisePage') {
      return [];
    }
    return [{
      key: 'mark-complete',
      type: 'button',
      onClick: () => {
        setIsMarkCompleteModalOpen(true);
        sendTrackEvent('edx.learner_portal.course.mark_complete.modal.opened', {
          course_run_id: courseRunId,
        });
      },
      children: (
        <>
          Mark as complete
          <span className="sr-only">for {title}</span>
        </>
      ),
    }];
  };

  const handleMarkCompleteModalOnClose = () => {
    setIsMarkCompleteModalOpen(false);
    sendTrackEvent('edx.learner_portal.course.mark_complete.modal.closed', {
      course_run_id: courseRunId,
    });
  };

  const handleMarkCompleteModalOnSuccess = (response) => {
    const transformedResponse = camelCaseObject(response);
    sendTrackEvent('edx.learner_portal.course.mark_complete.saved', {
      course_run_id: courseRunId,
    });
    // eslint-disable-next-line no-console
    console.log(transformedResponse);
    // TODO: use the response here
  };

  const renderNotifications = () => {
    if (!filteredNotifications.length) {
      return null;
    }
    return (
      <div className="notifications">
        <ul
          className="list-unstyled mb-0"
          aria-label="course due dates"
          role="alert"
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
      dropdownMenuItems={getDropdownMenuItems()}
      title={title}
      linkToCourse={linkToCourse}
      courseRunId={courseRunId}
      {...rest}
    >
      {renderNotifications()}
      <MarkCompleteModal
        isOpen={isMarkCompleteModalOpen}
        courseTitle={title}
        courseLink={linkToCourse}
        courseId={courseRunId}
        onClose={handleMarkCompleteModalOnClose}
        onSuccess={handleMarkCompleteModalOnSuccess}
      />
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
