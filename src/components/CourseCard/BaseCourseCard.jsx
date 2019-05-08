import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatusAlert } from '@edx/paragon';

import EmailSettingsModal from './EmailSettingsModal';

import './CourseCard.scss';

class BaseCourseCard extends Component {
  state = {
    modals: {
      emailSettings: null,
    },
    hasEmailsEnabled: this.props.hasEmailSettings || false,
    hasNewEmailSettings: false,
  };

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
      buttonLink,
      linkToCourse,
      hasEmailSettings,
      microMastersTitle,
    } = this.props;

    return (
      <div className={classNames('card mb-4', { 'is-micromasters': !!microMastersTitle })}>
        <div className="card-body">
          <div className="row no-gutters mb-3">
            <div className="col-xs-12 col-md-8">
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
            {buttonLink && (
              <div className="col-xs-12 col-md-4 text-md-right mt-3 mt-md-0">
                {buttonLink}
              </div>
            )}
          </div>
          {children && children}
          {hasEmailSettings && (
            <>
              {hasNewEmailSettings &&
                <div className="row no-gutters">
                  <div className="col-xs-12 col-sm-10 col-md-8">
                    <StatusAlert
                      alertType="success"
                      dialog={
                        <>
                          <FontAwesomeIcon className="mr-2" icon={['fas', 'check-circle']} />
                          Your email settings have been saved.
                        </>
                      }
                      onClose={() => {
                        this.setState({
                          hasNewEmailSettings: false,
                        });
                      }}
                      open
                    />
                  </div>
                </div>
              }
              <div className="row no-gutters">
                <div className="col">
                  <button
                    className="btn btn-link p-0"
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
                    <FontAwesomeIcon className="mr-2" icon={['fas', 'cog']} />
                    Email settings
                  </button>
                  {modals.emailSettings &&
                    <EmailSettingsModal
                      {...modals.emailSettings}
                      onClose={this.handleEmailSettingsModalOnClose}
                    />
                  }
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

BaseCourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  linkToCourse: PropTypes.string.isRequired,
  buttonLink: PropTypes.element,
  children: PropTypes.node,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  hasEmailsEnabled: PropTypes.bool,
  hasEmailSettings: PropTypes.bool,
  microMastersTitle: PropTypes.string,
};

BaseCourseCard.defaultProps = {
  buttonLink: null,
  children: null,
  startDate: null,
  endDate: null,
  hasEmailsEnabled: false,
  hasEmailSettings: true,
  microMastersTitle: null,
};

export default BaseCourseCard;
