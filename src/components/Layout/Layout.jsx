import React from 'react';
import PropTypes from 'prop-types';
import SiteHeader from '@edx/frontend-component-site-header';
import SiteFooter from '@edx/frontend-component-footer';

import EdXLogo from '../../images/edx-logo.svg';

import './Layout.scss';

const Layout = ({ children }) => (
  <>
    <SiteHeader
      logo={EdXLogo}
      logoDestination="https://edx.org"
      logoAltText="EdX Logo"
      mainMenu={[
        {
          type: 'item',
          href: '#',
          content: 'Courses',
        },
        {
          type: 'item',
          href: '#',
          content: 'Progress',
        },
      ]}
      loggedIn={false}
      username="user"
      avatar={null}
      userMenu={[
        {
          type: 'item',
          href: '#',
          content: 'Dashboard',
        },
        {
          type: 'item',
          href: '#',
          content: 'Profile',
        },
        {
          type: 'item',
          href: '#',
          content: 'Account Settings',
        },
        {
          type: 'item',
          href: '#',
          content: 'Logout',
        },
      ]}
      loggedOutItems={[
        { type: 'item', href: '#', content: 'Login' },
        { type: 'item', href: '#', content: 'Sign Up' },
      ]}
    />
    <>{children}</>
    <SiteFooter
      siteName="edX"
      siteLogo={EdXLogo}
      marketingSiteBaseUrl="https://www.example.com"
      supportUrl="https://www.example.com/support"
      contactUrl="https://www.example.com/contact"
      openSourceUrl="https://www.example.com/open"
      termsOfServiceUrl="https://www.example.com/terms-of-service"
      privacyPolicyUrl="https://www.example.com/privacy-policy"
      facebookUrl="https://www.facebook.com"
      twitterUrl="https://www.twitter.com"
      youTubeUrl="https://www.youtube.com"
      linkedInUrl="https://www.linkedin.com"
      googlePlusUrl="https://plus.google.com"
      redditUrl="https://reddit.com"
      appleAppStoreUrl="https://store.apple.com"
      googlePlayUrl="https://play.google.com"
      handleAllTrackEvents={() => {}}
    />
  </>
);

Layout.defaultProps = {
  children: [],
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
