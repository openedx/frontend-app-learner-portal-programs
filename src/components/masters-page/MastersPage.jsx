import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppContext } from '@edx/frontend-learner-portal-base/src/components/app-context';
import { getConfig } from '@edx/frontend-platform';

const MastersPage = ({
  children,
  pageContext,
  username,
}) => (
  <AppContext.Provider
    value={{
      header: {
        logo: getConfig().LOGO_TRADEMARK_URL,
        userMenu: [
          {
            type: 'item',
            href: getConfig().LMS_BASE_URL,
            content: 'Dashboard',
          },
          {
            type: 'item',
            href: '/',
            content: 'My Masters Degree',
          },
          {
            type: 'item',
            href: `${getConfig().LMS_BASE_URL}/u/${username}`,
            content: 'My Profile',
          },
          {
            type: 'item',
            href: `${getConfig().LMS_BASE_URL}/account/settings`,
            content: 'Account Settings',
          },
          {
            type: 'item',
            href: getConfig().LOGOUT_URL,
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
  username: state.userAccount.username,
});

export default connect(mapStateToProps)(MastersPage);

