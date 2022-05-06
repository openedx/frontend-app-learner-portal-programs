import React from 'react';
import PropTypes from 'prop-types';

function Sidebar(props) {
  return (
    <div className="col-xs-12 col offset-lg-1">
      {props.children}
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
