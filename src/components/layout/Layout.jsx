import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { sendPageEvent } from '@edx/frontend-platform/analytics';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import SiteFooter from '@edx/frontend-component-footer-edx';

import { SiteHeader } from '../site-header';

import './styles/Layout.scss';

class Layout extends Component {
  componentDidMount() {
    sendPageEvent();
  }

  getUserMenuItems = () => {
    const { header: { userMenu } = {} } = this.context;
    return userMenu || [];
  };

  getMainMenuItems = () => {
    const { header: { mainMenu } = {} } = this.context;
    return mainMenu || [];
  };

  render() {
    const {
      siteUrl, siteName, children, headerLogo,
    } = this.props;
    return (
      <IntlProvider locale="en">
        <>
          <Helmet titleTemplate="%s - edX" defaultTitle="edX">
            <html lang="en" />
          </Helmet>
          <SiteHeader
            headerLogo={headerLogo}
            logoAltText={siteName}
            logoDestination={siteUrl}
            userMenu={this.getUserMenuItems()}
          />
          <main id="content">
            {children}
          </main>
          <SiteFooter />
        </>
      </IntlProvider>
    );
  }
}

Layout.contextType = AppContext;

Layout.defaultProps = {
  children: [],
  siteName: 'edX',
  siteUrl: 'https://edx.org/',
  headerLogo: null,
};

Layout.propTypes = {
  children: PropTypes.node,
  siteName: PropTypes.string,
  siteUrl: PropTypes.string,
  headerLogo: PropTypes.string,
};

export default Layout;
