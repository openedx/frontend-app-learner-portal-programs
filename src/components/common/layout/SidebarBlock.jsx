import React from 'react';
import PropTypes from 'prop-types';

const SidebarBlock = props => (
  <div className={props.className}>
    {props.title && <h2 className="mb-2">{props.title}</h2>}
    {props.children}
  </div>
);

SidebarBlock.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SidebarBlock.defaultProps = {
  title: null,
  className: undefined,
};

export default SidebarBlock;
