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
    isFormChanged: false,
    disabledState: ['pending', 'complete'],
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { hasEmailsEnabled } = this.props;
    if (hasEmailsEnabled !== prevProps.hasEmailsEnabled) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        hasEmailsEnabled,
      });
    }

    const { isFormChanged } = this.state;
    if (isFormChanged !== prevState.isFormChanged && !isFormChanged) {
      this.setState({
        disabledState: ['pending', 'complete'],
      });
    }
  }

  getButtonState = () => {
    const { isSubmitting, isSuccessful } = this.state;
    if (isSubmitting) {
      return 'pending';
    } else if (isSuccessful) {
      return 'complete';
    }
    return 'default';
  }

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
    const { isFormChanged } = this.state;
    this.setState({
      isSubmitting: false,
      error: null,
      isSuccessful: null,
      disabledState: isFormChanged ? ['default', 'pending', 'complete'] : ['pending', 'complete'],
    });
    this.props.onClose();
  };

  handleEmailSettingsChange = (e) => {
    const { hasEmailsEnabled } = this.props;
    const isChecked = e.target.checked;
    this.setState({
      isFormChanged: isChecked !== hasEmailsEnabled,
      hasEmailsEnabled: isChecked,
    });
  };

  render() {
    const {
      error, hasEmailsEnabled, isSubmitting, disabledState,
    } = this.state;
    const { title, open } = this.props;

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
              prevChange: 'Save',
            }}
            disabledStates={disabledState}
            className="save-email-settings-btn btn-primary"
            state={this.getButtonState()}
            onClick={this.handleSaveButtonClick}
            key="save-email-settings-btn btn-primary"
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
