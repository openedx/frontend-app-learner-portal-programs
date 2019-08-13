import React from 'react';
import PropTypes from 'prop-types';

import { withAuthentication } from '../common/with-authentication';
import { Layout, MainContent, Sidebar } from '../common/layout';

const EnterprisePage = props => (
  <Layout pageContext={props.pageContext}>
    <div className="container my-3">
      <div className="row">
        <MainContent>
          <h1>Enterprise Page</h1>
          <p>
            Note: This page intentionally left blank and will be added to in
            additional PRs based on this branch. This is due to the refactoring
            of shared components that will come in a later PR.
          </p>
        </MainContent>
        <Sidebar>
          <p>Sidebar</p>
        </Sidebar>
      </div>
    </div>
  </Layout>
);

EnterprisePage.propTypes = {
  pageContext: PropTypes.shape({}).isRequired,
};

export default withAuthentication(EnterprisePage);
