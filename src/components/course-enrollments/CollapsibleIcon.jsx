import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CollapsibleIcon(props) {
  return (
    <FontAwesomeIcon
      className="text-primary"
      icon={props.icon}
      size="2x"
    />
  );
}

CollapsibleIcon.propTypes = {
  icon: PropTypes.shape({
    iconName: PropTypes.string.isRequired,
  }).isRequired,
};

export default CollapsibleIcon;
