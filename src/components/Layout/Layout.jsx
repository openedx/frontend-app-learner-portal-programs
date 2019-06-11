import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SiteHeader from '@edx/frontend-component-site-header';
import SiteFooter from '@edx/frontend-component-footer';
import { connect } from 'react-redux';

import './Layout.scss';

const LayoutQuery = graphql`
  query {
    site {
      siteMetadata {
        logo
        siteName
      }
    }
  }
`;

const Layout = ({ children, username, avatar }) => (
  <StaticQuery
    query={LayoutQuery}
    render={data => (
      <>
        <SiteHeader
          logo={data.site.siteMetadata.logo}
          logoDestination={`${data.site.siteMetadata.siteUrl}`}
          logoAltText={data.site.siteMetadata.siteName}
          loggedIn={!!username}
          username={username}
          avatar={avatar}
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
              href: `${process.env.LMS_BASE_URL}/u/${username}`,
              content: 'Profile',
            },
            {
              type: 'item',
              href: `${process.env.LMS_BASE_URL}/`,
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
        />
        <>{children}</>
        <SiteFooter
          siteName={data.site.siteMetadata.siteName}
          siteLogo={data.site.siteMetadata.logo}
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
    )}
  />
);

Layout.defaultProps = {
  children: [],
  username: null,
  avatar: null,
};

Layout.propTypes = {
  children: PropTypes.node,
  username: PropTypes.string,
  avatar: PropTypes.string,
};

const ConnectedLayout = connect(state => ({
  username: state.authentication.username,
  avatar: state.userAccount.profileImage.imageUrlMedium,
}))(Layout);

export default ConnectedLayout;
