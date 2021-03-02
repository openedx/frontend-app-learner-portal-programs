import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppContext } from '../../app-context';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

const MastersPage = ({
  children,
  pageContext,
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
            href: `${process.env.LMS_BASE_URL}/u/${getAuthenticatedUser().username}`,
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
};

export default MastersPage;

