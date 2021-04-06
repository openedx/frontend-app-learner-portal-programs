import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Responsive from 'react-responsive';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  ensureConfig,
} from '@edx/frontend-platform';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

import './Header.scss';


ensureConfig([
  'LMS_BASE_URL',
  'LOGOUT_URL',
  'LOGIN_URL',
], 'Header component');

function Header({
  headerLogo, logoAltText, logoDestination, userMenu, mainMenu,
}) {
  const { authenticatedUser } = useContext(AppContext);

  const props = {
    logo: headerLogo,
    logoAltText,
    logoDestination,
    loggedIn: authenticatedUser !== null,
    username: authenticatedUser !== null ? authenticatedUser.username : null,
    avatar: authenticatedUser !== null ? authenticatedUser.profileImage.imageUrlMedium : null,
    mainMenu,
    userMenu,
  };

  return (
    <>
      <Responsive maxWidth={768}>
        <MobileHeader {...props} />
      </Responsive>
      <Responsive minWidth={769}>
        <DesktopHeader {...props} />
      </Responsive>
    </>
  );
}

Header.propTypes = {
  intl: intlShape.isRequired,
  headerLogo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  mainMenu: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  userMenu: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
  })),
};

Header.defaultProps = {
  headerLogo: null,
  logoAltText: null,
  logoDestination: null,
  mainMenu: [],
  userMenu: [],
};

export default injectIntl(Header);
