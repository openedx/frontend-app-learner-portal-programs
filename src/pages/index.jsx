import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'react-router-redux';
import { PrivateRoute } from '@edx/frontend-auth';

import apiClient from '../data/apiClient';
import history from '../data/history';
import Layout from '../components/Layout/Layout';


const AppWrapper = () => (
  <IntlProvider locale="en">
    <Layout>
      <ConnectedRouter history={history}>
        <PrivateRoute
          path="/"
          component=""
          authenticatedAPIClient={apiClient}
          redirect={process.env.BASE_URL}
        />
      </ConnectedRouter>
    </Layout>
  </IntlProvider>
);

export default AppWrapper;
