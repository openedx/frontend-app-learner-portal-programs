import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input, Modal, StatusAlert } from '@edx/paragon';
import { faExclamationTriangle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    // TODO: Make API POST request to set the new email settings.
    this.setState({
      isSubmitting: true,
    }, () => {
      /* This callback function simulates an API call to save the
       * new email settings. There are lines below to either
       * resolve (200 response) or reject the promise (error response). To
       * see what happens when the promise is rejected, switch the comments.
       */

      // eslint-disable-next-line no-unused-vars
      new Promise((resolve, reject) => {
        setTimeout(resolve, 2000);
        // setTimeout(() => reject(new Error('Network Error')), 2000);
      })
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
              <label className="form-check-label ml-2" htmlFor="email-settings">
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
};


export default EmailSettingsModal;
