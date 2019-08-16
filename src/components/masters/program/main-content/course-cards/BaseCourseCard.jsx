import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { sendTrackEvent } from '@edx/frontend-analytics';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from '@edx/paragon';

import { EmailSettingsModal } from './email-settings';

import './styles/CourseCard.scss';

class BaseCourseCard extends Component {
  state = {
    modals: {
      emailSettings: {
        open: false,
        options: {},
      },
    },
    hasEmailsEnabled: this.props.hasEmailsEnabled,
  };

  setModalState = ({ key, open = false, options = {} }) => {
    this.setState(state => ({
      modals: {
        ...state.modals,
        [key]: {
          open,
          options,
        },
      },
    }));
  };

  handleEmailSettingsButtonClick = () => {
    const {
      title,
      courseRunId,
    } = this.props;

    const {
      hasEmailsEnabled,
    } = this.state;

    this.setModalState({
      key: 'emailSettings',
      open: true,
      options: {
        title,
        hasEmailsEnabled,
      },
    });
    sendTrackEvent('edx.learner_portal.email_settings_modal.opened', { course_run_id: courseRunId });
  }

  handleEmailSettingsModalOnClose = (hasEmailsEnabled) => {
    this.resetModals();

    if (hasEmailsEnabled !== undefined) {
      this.setState({
        hasEmailsEnabled,
      });
    }
  };

  resetModals = () => {
    this.setModalState({ key: 'emailSettings' });
  };

  render() {
    const {
      modals,
    } = this.state;
    const {
      children,
      title,
      startDate,
      endDate,
      buttons,
      linkToCourse,
      hasEmailSettings,
      microMastersTitle,
      courseRunId,
    } = this.props;

    return (
      <div className={classNames('card mb-4', { 'is-micromasters': !!microMastersTitle })}>
        <div className="card-body">
          <div className="row no-gutters">
            <div className="col-10">
              {microMastersTitle && (
              <p className="font-weight-bold w-75 mb-2">
                {microMastersTitle}
              </p>
              )}
              <h4 className="card-title mb-1 font-weight-normal">
                <a href={linkToCourse}>{title}</a>
              </h4>
            </div>
            <div className="col-2 text-right">
              <Dropdown>
                <Dropdown.Button className="btn-outline-secondary">
                  <FontAwesomeIcon icon={faCog} />
                </Dropdown.Button>
                <Dropdown.Menu>
                  <Dropdown.Item
                    type="button"
                    onClick={this.handleEmailSettingsButtonClick}
                  >
                    Email Settings
                    <span className="sr-only">for {title}</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {startDate && (
                <p className="card-text">
                  Course starts on {moment(startDate).format('MMMM D, YYYY')}
                </p>
              )}
              {endDate && (
                <p className="card-text">
                  Course {moment(endDate) > moment() ? 'ends' : 'ended'} on {moment(endDate).format('MMMM D, YYYY')}
                </p>
              )}
              <div className="card-buttons mt-3">
                {buttons}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {children}
            </div>
          </div>
          {hasEmailSettings && modals.emailSettings && modals.emailSettings.options && (
            <EmailSettingsModal
              {...modals.emailSettings.options}
              courseRunId={courseRunId}
              onClose={this.handleEmailSettingsModalOnClose}
              open={modals.emailSettings.open}
            />
          )}
        </div>
      </div>
    );
  }
}

BaseCourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  linkToCourse: PropTypes.string.isRequired,
  courseRunId: PropTypes.string.isRequired,
  buttons: PropTypes.element,
  children: PropTypes.node,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  hasEmailsEnabled: PropTypes.bool,
  hasEmailSettings: PropTypes.bool,
  microMastersTitle: PropTypes.string,
};

BaseCourseCard.defaultProps = {
  buttons: null,
  children: null,
  startDate: null,
  endDate: null,
  hasEmailsEnabled: false,
  hasEmailSettings: true,
  microMastersTitle: null,
};

export default BaseCourseCard;
