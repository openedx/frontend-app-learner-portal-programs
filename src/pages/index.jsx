import React from 'react';
import { IntlProvider } from 'react-intl';
import SiteFooter from '@edx/frontend-component-footer';

import Header from '../components/Header/Header';
import Logo from '../../assets/openedx-logo.png';
import Layout from '../components/Layout/Layout';

const IndexPage = () => (
  <IntlProvider locale="en">
    <Layout>
      <Header />
      <SiteFooter
        siteName="Open Edx"
        siteLogo={Logo}
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
    </Layout>
  </IntlProvider>
);

export default IndexPage;
