import React from 'react';
import PropTypes from 'prop-types';

const SidebarBlock = props => (
  <div className={props.className}>
    <h2 className="mb-2">{props.title}</h2>
    {props.children}
  </div>
);

SidebarBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SidebarBlock.defaultProps = {
  className: undefined,
};

export default SidebarBlock;
