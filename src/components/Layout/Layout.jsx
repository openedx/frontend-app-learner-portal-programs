import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import SiteHeader from '@edx/frontend-component-site-header';
import SiteFooter from '@edx/frontend-component-footer';
import { connect } from 'react-redux';

import './Layout.scss';

const Layout = props => (
  <>
    <Helmet titleTemplate="%s - edX" defaultTitle="edX" />
    <SiteHeader
      logo={props.logo}
      logoDestination={props.siteUrl}
      logoAltText={props.siteName}
      loggedIn={!!props.username}
      username={props.username}
      avatar={props.avatar}
      userMenu={[
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
          href: `${process.env.LMS_BASE_URL}/u/${props.username}`,
          content: 'Profile',
        },
        {
          type: 'item',
          href: `${process.env.LMS_BASE_URL}/account/settings`,
          content: 'Account Settings',
        },
        {
          type: 'item',
          href: process.env.LOGOUT_URL,
          content: 'Sign out',
        },
      ]}
      loggedOutItems={[
        { type: 'item', href: '#', content: 'Login' },
        { type: 'item', href: '#', content: 'Sign Up' },
      ]}
      skipNavId="content"
    />
    <>{props.children}</>
    <SiteFooter
      siteName={props.siteName}
      siteLogo={props.logo}
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
  avatar: null,
  children: [],
  logo: 'https://www.edx.org/sites/default/files/open-edx-logo-with-reg.png',
  siteName: 'Open Edx',
  siteUrl: 'https://open.edx.org/',
  username: null,
};

Layout.propTypes = {
  avatar: PropTypes.string,
  children: PropTypes.node,
  logo: PropTypes.string,
  siteName: PropTypes.string,
  siteUrl: PropTypes.string,
  username: PropTypes.string,
};

const ConnectedLayout = connect(state => ({
  avatar: state.userAccount.profileImage.imageUrlMedium,
  username: state.authentication.username,
}))(Layout);

export default ConnectedLayout;
