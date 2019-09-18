import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AppContext } from '../../common/app-context';

const MastersPage = ({
  children,
  pageContext,
  username,
}) => (
  <AppContext.Provider
    value={{
      header: {
        userMenu: [
          {
            type: 'item',
            href: process.env.LMS_BASE_URL,
            content: 'Dashboard',
          },
          {
            type: 'item',
            href: '/',
            content: 'My Masters Degree',
          },
          {
            type: 'item',
            href: `${process.env.LMS_BASE_URL}/u/${username}`,
            content: 'My Profile',
          },
          {
            type: 'item',
            href: `${process.env.LMS_BASE_URL}/account/settings`,
            content: 'Account Settings',
          },
          {
            type: 'item',
            href: process.env.LOGOUT_URL,
            content: 'Sign Out',
          },
        ],
      },
      pageContext,
    }}
  >
    {children}
  </AppContext.Provider>
);

MastersPage.propTypes = {
  children: PropTypes.element.isRequired,
  pageContext: PropTypes.shape({}).isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  username: state.authentication.username,
});

export default connect(mapStateToProps)(MastersPage);

