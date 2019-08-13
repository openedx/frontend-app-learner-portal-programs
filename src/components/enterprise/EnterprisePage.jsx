import React from 'react';
import { IntlProvider } from 'react-intl';

import { Layout, withAuthentication } from '../common';

const EnterprisePage = () => (
  <IntlProvider locale="en">
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h1>Enterprise Page</h1>
            <p>
              Note: This page intentionally left blank and will be added to in additional
              PRs based on this branch. This is due to the refactoring of shared components
              that will come in a later PR.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  </IntlProvider>
);
export default withAuthentication(EnterprisePage);
