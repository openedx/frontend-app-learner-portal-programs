import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import SiteHeader from '@edx/frontend-component-site-header';
import SiteFooter from '@edx/frontend-component-footer';
import { connect } from 'react-redux';
import { Link } from "@reach/router";

import EdXLogo from '../../../images/edx-logo.svg';

import './styles/Layout.scss';

const LayoutContext = React.createContext();

class Layout extends Component {
  getUserMenuItems = () => {
    const { pageContext: { pageType }, username } = this.props;
    const menuItems = [
      {
        type: 'item',
        href: process.env.LMS_BASE_URL,
        content: 'Dashboard',
      },
      {
        type: 'item',
        href: `${process.env.LMS_BASE_URL}/u/${username}`,
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
    ];

    if (pageType !== 'pages.EnterprisePage') {
      menuItems.splice(1, 0, {
        type: 'item',
        href: '/',
        content: 'My Masters Degree',
      });
    }

    return menuItems;
  };

  render() {
    const {
      siteUrl, siteName, username, avatar, pageContext, children,
    } = this.props;
    return (
      <IntlProvider locale="en">
        <>
          <Helmet titleTemplate="%s - edX" defaultTitle="edX" />
          <SiteHeader
            logo={EdXLogo}
            logoDestination={siteUrl}
            logoAltText={siteName}
            loggedIn={!!username}
            username={username}
            avatar={avatar}
            userMenu={this.getUserMenuItems()}
            loggedOutItems={[
              { type: 'item', href: '#', content: 'Login' },
              { type: 'item', href: '#', content: 'Sign Up' },
            ]}
            skipNavId="content"
          />
          <LayoutContext.Provider value={{ pageContext }}>
            <main id="content">
              <Link to="u/edx">Profile</Link>
              {children}
            </main>
          </LayoutContext.Provider>
          <SiteFooter
            siteName={siteName}
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
      </IntlProvider>
    );
  }
}

Layout.defaultProps = {
  pageContext: {},
  avatar: null,
  children: [],
  siteName: 'edX',
  siteUrl: 'https://edx.org/',
  username: null,
};

Layout.propTypes = {
  pageContext: PropTypes.shape({
    pageType: PropTypes.string,
  }),
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

export { LayoutContext };

export default ConnectedLayout;
