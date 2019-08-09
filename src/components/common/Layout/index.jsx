import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import SiteHeader from '@edx/frontend-component-site-header';
import SiteFooter from '@edx/frontend-component-footer';
import { connect } from 'react-redux';

import EdXLogo from '../../../images/edx-logo.svg';

import './styles/Layout.scss';

const Layout = props => (
  <>
    <Helmet titleTemplate="%s - edX" defaultTitle="edX" />
    <SiteHeader
      logo={EdXLogo}
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
      siteLogo={EdXLogo}
      marketingSiteBaseUrl="https://www.edx.org"
      supportUrl="https://support.edx.org/hc/en-us"
      contactUrl="https://courses.edx.org/support/contact_us"
      openSourceUrl="https://open.edx.org/"
      termsOfServiceUrl="https://www.edx.org/edx-terms-service"
      privacyPolicyUrl="https://www.edx.org/edx-privacy-policy"
      facebookUrl="https://www.facebook.com/edX"
      twitterUrl="https://twitter.com/edXOnline"
      youTubeUrl="https://www.youtube.com/user/edxonline"
      linkedInUrl="http://www.linkedin.com/company/edx"
      googlePlusUrl="https://plus.google.com/+edXOnline"
      redditUrl="https://www.reddit.com/r/edX/"
      appleAppStoreUrl="https://apps.apple.com/us/app/edx/id945480667"
      googlePlayUrl="https://play.google.com/store/apps/details?id=org.edx.mobile"
      handleAllTrackEvents={() => {}}
    />
  </>
);

Layout.defaultProps = {
  avatar: null,
  children: [],
  siteName: 'edX',
  siteUrl: 'https://edx.org/',
  username: null,
};

Layout.propTypes = {
  avatar: PropTypes.string,
  children: PropTypes.node,
  siteName: PropTypes.string,
  siteUrl: PropTypes.string,
  username: PropTypes.string,
};

const ConnectedLayout = connect(state => ({
  avatar: state.userAccount.profileImage.imageUrlMedium,
  username: state.authentication.username,
}))(Layout);

export default ConnectedLayout;
