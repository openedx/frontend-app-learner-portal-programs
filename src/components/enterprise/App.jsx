import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Router } from '@reach/router';
import { ConnectedProfilePage } from  '@edx/frontend-app-profile';

import { configuration } from '../../../environment';
import { withAuthentication } from '../common/with-authentication';
import { Layout } from '../common/layout';
import { DashboardPage } from './dashboard';

const App = (props) => {
  const { pageContext } = props;
  const { enterpriseName } = pageContext;
  return (
    <>
      <Helmet title={enterpriseName} />
      <Router>
        <Layout path="/" pageContext={pageContext}>
          <DashboardPage path="/" pageContext={pageContext} />
          <ConnectedProfilePage path="u/:user" />
        </Layout>
      </Router>
    </>
  );
};

App.propTypes = {
  pageContext: PropTypes.shape({
    enterpriseName: PropTypes.string,
  }).isRequired,
};

export default withAuthentication(App);
