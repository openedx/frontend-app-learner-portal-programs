import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SiteHeader from '@edx/frontend-component-site-header';
import SiteFooter from '@edx/frontend-component-footer';

import './Layout.scss';
import Hero from '../Hero';

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

const Layout = ({ children }) => (
  <StaticQuery
    query={LayoutQuery}
    render={data => (
      <>
        <SiteHeader
          logo={data.site.siteMetadata.logo}
          logoDestination="http://example.com"
          logoAltText={data.site.siteMetadata.siteName}
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
        <Hero
          organizationName="Georgia Tech Institute of Technology"
          courseTitle="Data Science Master's Degree"
          organizationLogo={{
            url: 'https://www.edx.org/sites/default/files/school/image/logo/gtx-logo-200x101.png',
            alt: 'Organization Logo',
          }}
          textureImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt-cyber-title_bg_img_440x400.jpg"
          coverImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt_cyber_campus_image_1000x400.jpg"
          overallRanking="Top 10-ranked program"
        />
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
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
