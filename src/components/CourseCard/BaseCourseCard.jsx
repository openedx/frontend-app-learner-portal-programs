import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { faCog, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import EmailSettingsModal from './EmailSettingsModal';

import './CourseCard.scss';

class BaseCourseCard extends Component {
  state = {
    modals: {
      emailSettings: null,
    },
    hasEmailsEnabled: this.props.hasEmailsEnabled,
    hasNewEmailSettings: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { hasNewEmailSettings } = this.state;

    if (hasNewEmailSettings && hasNewEmailSettings !== prevState.hasNewEmailSettings) {
      setTimeout(() => {
        this.setState({
          hasNewEmailSettings: false,
        });
      }, 6000);
    }
  }

  setModalState = ({ key, options }) => {
    this.setState(state => ({
      modals: {
        ...state.modals,
        [key]: options,
      },
    }));
  };

  handleEmailSettingsModalOnClose = (hasEmailsEnabled) => {
    this.resetModals();

    if (hasEmailsEnabled !== undefined) {
      this.setState({
        hasNewEmailSettings: true,
        hasEmailsEnabled,
      });
    }
  };

  resetModals = () => {
    this.setState({
      modals: {
        emailSettings: null,
      },
    });
  };

  render() {
    const {
      modals,
      hasEmailsEnabled,
      hasNewEmailSettings,
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
    } = this.props;

    return (
      <div className={classNames('card mb-4', { 'is-micromasters': !!microMastersTitle })}>
        <div className="card-body">
          <div className="row no-gutters mb-3">
            <div className="col-lg-12 col-xl-8">
              {microMastersTitle && (
                <p className="font-weight-bold w-75 mb-2">
                  {microMastersTitle}
                </p>
              )}
              <h3 className="card-title mb-1 font-weight-normal">
                <a href={linkToCourse}>{title}</a>
              </h3>
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
            </div>
            {buttons && (
              <div className="col-lg-12 col-xl-4 text-xl-right mt-3 mt-xl-0">
                {buttons}
              </div>
            )}
          </div>
          {children}
          {hasEmailSettings && (
            <div className="row no-gutters">
              <div className="col">
                <button
                  className="email-settings-btn btn btn-link p-0 mr-3"
                  onClick={() => {
                    this.setModalState({
                      key: 'emailSettings',
                      options: {
                        title,
                        hasEmailsEnabled,
                      },
                    });
                    this.setState({
                      hasNewEmailSettings: false,
                    });
                  }}
                >
                  <FontAwesomeIcon className="mr-2" icon={faCog} />
                  Email settings
                </button>
                {hasNewEmailSettings &&
                  <span className="text-success" role="alert">
                    <FontAwesomeIcon className="mr-2" icon={faCheckCircle} />
                    Saved
                    <span className="sr-only">your email settings for {title}</span>
                  </span>
                }
                {modals.emailSettings &&
                  <EmailSettingsModal
                    {...modals.emailSettings}
                    onClose={this.handleEmailSettingsModalOnClose}
                  />
                }
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

BaseCourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  linkToCourse: PropTypes.string.isRequired,
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
