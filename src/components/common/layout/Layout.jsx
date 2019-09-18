import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import SiteHeader from '@edx/frontend-component-site-header';
import SiteFooter from '@edx/frontend-component-footer';
import { connect } from 'react-redux';

import { AppContext } from '../app-context';

import EdXLogo from '../../../images/edx-logo.svg';

import './styles/Layout.scss';

class Layout extends Component {
  static contextType = AppContext;

  getUserMenuItems = () => {
    const { header: { userMenu } } = this.context;
    return userMenu || [];
  };

  getMainMenuItems = () => {
    const { header: { mainMenu } } = this.context;
    return mainMenu || [];
  };

  render() {
    const {
      siteUrl, siteName, username, avatar, children, headerLogo, footerLogo,
    } = this.props;
    return (
      <IntlProvider locale="en">
        <>
          <Helmet titleTemplate="%s - edX" defaultTitle="edX" />
          <SiteHeader
            logo={headerLogo || EdXLogo}
            logoDestination={siteUrl}
            logoAltText={siteName}
            loggedIn={!!username}
            username={username}
            avatar={avatar}
            mainMenu={this.getMainMenuItems()}
            userMenu={this.getUserMenuItems()}
            loggedOutItems={[
              { type: 'item', href: '#', content: 'Login' },
              { type: 'item', href: '#', content: 'Sign Up' },
            ]}
            skipNavId="content"
          />
          <main id="content">
            {children}
          </main>
          <SiteFooter
            siteName={siteName}
            siteLogo={footerLogo || EdXLogo}
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
  avatar: null,
  children: [],
  siteName: 'edX',
  siteUrl: 'https://edx.org/',
  username: null,
  headerLogo: null,
  footerLogo: null,
};

Layout.propTypes = {
  avatar: PropTypes.string,
  children: PropTypes.node,
  siteName: PropTypes.string,
  siteUrl: PropTypes.string,
  username: PropTypes.string,
  headerLogo: PropTypes.string,
  footerLogo: PropTypes.string,
};

const ConnectedLayout = connect(state => ({
  avatar: state.userAccount.profileImage.imageUrlMedium,
  username: state.authentication.username,
}))(Layout);

export default ConnectedLayout;
