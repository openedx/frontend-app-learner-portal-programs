import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import MediaQuery from 'react-responsive';
import { breakpoints } from '@edx/paragon';

import { withAuthentication } from '../../common/with-authentication';
import { Layout, MainContent, Sidebar } from '../../common/layout';
import { Hero } from '../../common/hero';
import { DashboardMainContent } from './main-content';
import { DashboardSidebar } from './sidebar';

const DashboardPage = (props) => {
  const { pageContext } = props;
  const { enterpriseName } = pageContext;
  return (
    <Layout
      pageContext={pageContext}
      headerLogo={pageContext.pageBranding.organization_logo.url}
      footerLogo="https://files.edx.org/openedx-logos/edx-openedx-logo-tag.png"
    >
      <Helmet title={enterpriseName} />
      <Hero title={enterpriseName} />
      <div className="container py-5">
        <div className="row">
          <MainContent>
            <DashboardMainContent />
          </MainContent>
          <MediaQuery minWidth={breakpoints.large.minWidth}>
            {matches => matches && (
              <Sidebar>
                <DashboardSidebar />
              </Sidebar>
            )}
          </MediaQuery>
        </div>
      </div>
    </Layout>
  );
};

DashboardPage.propTypes = {
  pageContext: PropTypes.shape({
    enterpriseName: PropTypes.string,
  }).isRequired,
};

export default withAuthentication(DashboardPage);
