import React from 'react';
import PropTypes from 'prop-types';

import './Layout.scss';

const Layout = ({ children }) => (
  <div>{children}</div>
);

Layout.defaultProps = {
  children: [],
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;

