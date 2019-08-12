import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Modal, StatusAlert, StatefulButton } from '@edx/paragon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { updateEmailSettings } from './data';
import './styles/EmailSettingsModal.scss';

class EmailSettingsModal extends Component {
  state = {
    hasEmailsEnabled: false,
    isSubmitting: false,
    isSuccessful: false,
    error: null,
  };

  componentDidUpdate(prevProps) {
    const { hasEmailsEnabled } = this.props;
    if (hasEmailsEnabled !== prevProps.hasEmailsEnabled) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        hasEmailsEnabled,
      });
    }
  }

  handleEmailSettingsChange = (e) => {
    const { hasEmailsEnabled } = this.props;
    const isChecked = e.target.checked;
    this.setState({
      hasEmailsEnabled: isChecked,
    });
  };

  handleSaveButtonClick = () => {
    const { hasEmailsEnabled } = this.state;
    const { courseRunId, updateEmailSettings } = this.props; // eslint-disable-line no-shadow

    this.setState({
      isSubmitting: true,
    }, async () => {
      try {
        await updateEmailSettings(courseRunId, hasEmailsEnabled);
        this.setState({
          isSuccessful: true,
          isSubmitting: false,
        });
      } catch (error) {
        this.setState({
          isSubmitting: false,
          error,
        });
      }
    });
  };

  handleOnClose = () => {
    this.setState({
      isSubmitting: false,
      isSuccessful: false,
      error: null,
    });
  };

  handleButtonState = () => {
    const { isSubmitting, isSuccessful } = this.state;

    if (isSubmitting) {
      return 'pending';
    } else if (isSuccessful) {
      return 'complete';
    }

    return 'default';
  }

  render() {
    const {
      error, hasEmailsEnabled, isSubmitting,
    } = this.state;
    const { title, open } = this.props;

    const buttonState = this.handleButtonState();

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
          <StatefulButton
            labels={{
              default: 'Save',
              pending: 'Saving',
              complete: 'Saved',
            }}
            disabledStates={['pending', 'complete']}
            className="save-email-settings-btn btn-primary"
            state={buttonState}
            onClick={this.handleSaveButtonClick}
          />,
        ]}
        open={open}
      />
    );
  }
}

EmailSettingsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  updateEmailSettings: PropTypes.func.isRequired,
  courseRunId: PropTypes.string.isRequired,
  title: PropTypes.string,
  hasEmailsEnabled: PropTypes.bool,
  open: PropTypes.bool,
};

EmailSettingsModal.defaultProps = {
  title: null,
  hasEmailsEnabled: false,
  open: false,
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
