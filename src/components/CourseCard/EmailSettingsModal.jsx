import React from 'react';
import PropTypes from 'prop-types';
import {Button, CheckBox, Icon, Modal} from '@edx/paragon';

import './EmailSettingsModal.scss';


const EmailSettingsModal = (props) => {
  const modalRef = React.createRef();
  const {
    title, submitting, onClose, onEmailSettingsChange,
  } = props;

  return (
    <React.Fragment>
      <Modal
        ref={modalRef}
        title={title}
        body={
          <React.Fragment>
            <CheckBox
              name="email_settings"
              label="Receive course emails such as reminders, schedule updates, and other critical announcements."
              disabled={submitting}
              onChange={onEmailSettingsChange}
            />
          </React.Fragment>
        }
        onClose={onClose}
        closeText={submitting ? <Icon className={['fa', 'fa-spinner', 'fa-spin', 'mr-2']} /> : 'Save Settings'}
        open
      />
    </React.Fragment>
  );
};

EmailSettingsModal.defaultProps = {
  submitting: false,
};

EmailSettingsModal.propTypes = {
  title: PropTypes.string.isRequired,
  submitting: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onEmailSettingsChange: PropTypes.func.isRequired,
};


export default EmailSettingsModal;
