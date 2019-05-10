import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'react-router-redux';
import { PrivateRoute } from '@edx/frontend-auth';

import Layout from '../components/Layout/Layout';
import DashboardHome from '../components/DashboardHome/DashboardHome';

import apiClient from '../data/apiClient';
import history from '../data/history';

const App = () => (
  <IntlProvider locale="en">
    <Layout>
      <ConnectedRouter history={history}>
        <>
          <PrivateRoute
            path="/app/1"
            component={DashboardHome}
            authenticatedAPIClient={apiClient}
            redirect={process.env.BASE_URL}
          />
          <PrivateRoute
            path="/app/2"
            component={DashboardHome}
            authenticatedAPIClient={apiClient}
            redirect={process.env.BASE_URL}
          />
        </>
      </ConnectedRouter>
    </Layout>
  </IntlProvider>
);

export default App;
