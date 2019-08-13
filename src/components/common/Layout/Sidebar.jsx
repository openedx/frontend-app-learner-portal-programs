import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = props => (
  <div className="col offset-lg-1">
    {props.children}
  </div>
);

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
