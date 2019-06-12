import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input, Modal, StatusAlert } from '@edx/paragon';
import { faExclamationTriangle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import updateEmailSettings from '../../data/actions/emailSettings';
import './EmailSettingsModal.scss';

class EmailSettingsModal extends Component {
  state = {
    hasEmailsEnabled: this.props.hasEmailsEnabled,
    isSubmitting: false,
    isFormChanged: false,
    error: null,
  };

  handleEmailSettingsChange = (e) => {
    const { hasEmailsEnabled } = this.props;
    const isChecked = e.target.checked;
    this.setState({
      isFormChanged: isChecked !== hasEmailsEnabled,
      hasEmailsEnabled: isChecked,
    });
  };

  handleSaveButtonClick = () => {
    const { hasEmailsEnabled } = this.state;
    const { courseRunId, updateEmailSettings } = this.props; // eslint-disable-line no-shadow

    this.setState({
      isSubmitting: true,
    }, () => {
      updateEmailSettings(courseRunId, hasEmailsEnabled)
        .then(() => {
          this.props.onClose(hasEmailsEnabled);
        })
        .catch((error) => {
          this.setState({
            isSubmitting: false,
            error,
          });
        });
    });
  };

  handleOnClose = () => {
    this.setState({
      isSubmitting: false,
      isFormChanged: false,
      error: null,
    });
    this.props.onClose();
  };

  render() {
    const {
      error, isFormChanged, hasEmailsEnabled, isSubmitting,
    } = this.state;
    const { title } = this.props;

    return (
      <Modal
        title={`Email Settings for ${title}`}
        body={
          <>
            {error && (
              <StatusAlert
                alertType="danger"
                dialog={
                  <div className="d-flex">
                    <div>
                      <FontAwesomeIcon className="mr-3" icon={faExclamationTriangle} />
                    </div>
                    <div>
                      An error occurred while saving your email settings. Please try again.
                    </div>
                  </div>
                }
                dismissible={false}
                open
              />
            )}
            <div className="form-check">
              <Input
                type="checkbox"
                id="email-settings"
                checked={hasEmailsEnabled}
                disabled={isSubmitting}
                onChange={this.handleEmailSettingsChange}
              />
              <label className="form-check-label ml-2 font-weight-normal" htmlFor="email-settings">
                Receive course emails such as reminders, schedule updates, and
                other critical announcements.
              </label>
            </div>
          </>
        }
        onClose={this.handleOnClose}
        buttons={[
          {
            label: (
              <>
                {isSubmitting &&
                  <FontAwesomeIcon className="mr-2" icon={faSpinner} spin />
                }
                {isSubmitting ? 'Saving' : 'Save'}
                {' changes'}
                {isSubmitting && '...'}
              </>
            ),
            className: classNames('save-email-settings-btn', { 'is-form-changed': isFormChanged }),
            buttonType: 'primary',
            disabled: isSubmitting || !isFormChanged,
            onClick: this.handleSaveButtonClick,
          },
        ]}
        open
      />
    );
  }
}

EmailSettingsModal.propTypes = {
  title: PropTypes.string.isRequired,
  hasEmailsEnabled: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  updateEmailSettings: PropTypes.func.isRequired,
  courseRunId: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateEmailSettings: (courseRunId, hasEmailsEnabled) => new Promise((resolve, reject) => {
    dispatch(updateEmailSettings({
      courseRunId,
      hasEmailsEnabled,
      onSuccess: (response) => { resolve(response); },
      onError: (error) => { reject(error); },
    }));
  }),
});

export default connect(null, mapDispatchToProps)(EmailSettingsModal);
