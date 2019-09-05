import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal, StatefulButton } from '@edx/paragon';

import ModalBody from './ModalBody';
import { markCourseAsCompleteRequest } from './data/service';
import { LayoutContext } from '../../../layout';

export const MarkCompleteModalContext = createContext();

const initialState = {
  confirmButtonState: 'default',
  confirmError: null,
};

const MarkCompleteModal = ({
  courseId,
  isOpen,
  courseTitle,
  courseLink,
  onSuccess,
  onClose,
}) => {
  const { pageContext: { enterpriseUUID } } = useContext(LayoutContext);
  const [
    { confirmButtonState, confirmError },
    setState,
  ] = useState(initialState);

  const handleConfirmButtonClick = async () => {
    setState({ confirmButtonState: 'pending' });
    try {
      const res = await markCourseAsCompleteRequest({
        enterprise_id: enterpriseUUID,
        course_id: courseId,
        marked_done: true,
      });
      setState({ confirmButtonState: 'complete' });
      onSuccess(res);
    } catch (error) {
      setState({
        confirmButtonState: 'default',
        confirmError: error,
      });
    }
  };

  const handleModalOnClose = () => {
    setState({ ...initialState });
    onClose();
  };

  return (
    <MarkCompleteModalContext.Provider
      value={{
        courseTitle,
        courseLink,
        confirmError,
      }}
    >
      <Modal
        title="Mark course as complete"
        body={<ModalBody />}
        buttons={[
          <StatefulButton
            labels={{
              default: 'Mark as complete',
              pending: 'Marking as complete...',
              complete: 'Marked as complete',
            }}
            disabledStates={['pending', 'complete']}
            className="confirm-mark-complete-btn btn-primary"
            state={confirmButtonState}
            onClick={handleConfirmButtonClick}
            key="confirm-mark-complete-btn"
          />,
        ]}
        open={isOpen}
        onClose={handleModalOnClose}
      />
    </MarkCompleteModalContext.Provider>
  );
};

MarkCompleteModal.propTypes = {
  courseId: PropTypes.string.isRequired,
  courseTitle: PropTypes.string.isRequired,
  courseLink: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

MarkCompleteModal.defaultProps = {
  isOpen: false,
};

export default MarkCompleteModal;
