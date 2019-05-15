import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { StatusAlert } from '@edx/paragon';

const Notification = props => (
  <li>
    <StatusAlert
      className="notification p-2 mb-2 border"
      dismissible={false}
      dialog={
        <div className="row no-gutters">
          {/**
            NOTE: This is set up as a column such that if/when the API supports
            dismissible notifications we can set the `dismissible` prop to `true`
            and use `.col-10` here instead.
          */}
          <div className="col-12">
            <a href={props.url}>{props.name}</a>
            {' is due '}
            <span className="font-weight-bold">
              {moment(props.date).fromNow()}
            </span>
            {' on '}
            {moment(props.date).format('ddd MMMM D, YYYY')}
          </div>
        </div>
      }
      open
    />
  </li>
);

Notification.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Notification;
