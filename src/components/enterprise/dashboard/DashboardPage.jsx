import React from 'react';
import PropTypes from 'prop-types';

import { withAuthentication } from '../../common/with-authentication';
import { Layout, MainContent, Sidebar } from '../../common/layout';
import { Hero } from '../../common/hero';
import { DashboardMainContent } from './main-content';
import { DashboardSidebar } from './sidebar';

const DashboardPage = (props) => {
  const { pageContext } = props;
  const { enterpriseName } = pageContext;
  return (
    <Layout pageContext={props.pageContext}>
      <Hero title={enterpriseName} />
      <div className="container py-5">
        <div className="row">
          <MainContent>
            <DashboardMainContent />
          </MainContent>
          <Sidebar>
            <DashboardSidebar />
          </Sidebar>
        </div>
      </div>
    </Layout>
  );
};

DashboardPage.propTypes = {
  pageContext: PropTypes.shape({}).isRequired,
};

export default withAuthentication(DashboardPage);
