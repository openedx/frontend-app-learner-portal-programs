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

  getPacingType = () => {
    const { pacing } = this.props;
    return pacing && pacing.replace('_', '-');
  }

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
    this.setModalState({ key: 'emailSettings' });
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
      courseRunId,
      organization,
      pacing,
    } = this.props;

    return (
      <div
        className={classNames(
          'course-card card border-top py-3',
          { 'is-micromasters': !!microMastersTitle },
        )}
      >
        <div className="card-body">
          <div className="row no-gutters">
            <div className="col-lg-12 col-xl-8">
              {microMastersTitle && (
                <p className="font-weight-bold w-75 mb-2">
                  {microMastersTitle}
                </p>
              )}
              <h4 className="card-title mb-2 font-weight-normal">
                <a href={linkToCourse}>{title}</a>
              </h4>
              {organization && (
                <p className="card-text">{organization}</p>
              )}
              <div className="card-buttons mb-3">
                {buttons}
              </div>
            </div>
            <div className="col-lg-12 col-xl-4 text-xl-right mt-3 mt-xl-0">
              <Dropdown>
                <Dropdown.Button className="btn-outline-secondary bg-white">
                  <FontAwesomeIcon icon={faCog} />
                </Dropdown.Button>
                <Dropdown.Menu>
                  {hasEmailSettings && (
                    <Dropdown.Item
                      type="button"
                      onClick={() => {
                        this.setModalState({
                          key: 'emailSettings',
                          open: true,
                          options: {
                            title,
                            hasEmailsEnabled,
                          },
                        });
                        this.setState({
                          hasNewEmailSettings: false,
                        });
                        sendTrackEvent('edx.learner_portal.email_settings_modal.opened', { course_run_id: courseRunId });
                      }}
                    >
                      Email Settings
                      <span className="sr-only">for {title}</span>
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    type="button"
                    onClick={() => { /* TODO: move to completed */ }}
                  >
                    Move to completed
                  </Dropdown.Item>
                  <Dropdown.Item
                    type="button"
                    onClick={() => { /* TODO: unenroll */ }}
                  >
                    Unenroll
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {children}
              <p className="card-text">
                {pacing && (
                  <>
                    This course is
                    {' '}
                    {this.getPacingType()}
                    {'. '}
                  </>
                )}
                {endDate && (
                  <>
                    Complete at your own speed before {moment(endDate).format('MMMM D, YYYY')}.
                  </>
                )}
              </p>
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
