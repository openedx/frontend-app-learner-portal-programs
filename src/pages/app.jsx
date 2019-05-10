import React from 'react';
import { IntlProvider } from 'react-intl';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ConnectedRouter } from 'react-router-redux';
import { PrivateRoute } from '@edx/frontend-auth';

import apiClient from '../data/apiClient';
import history from '../data/history';
import Layout from '../components/Layout/Layout';
import DashboardHome from '../components/DashboardHome/DashboardHome';

// Add icons to font-awesome library
library.add(fas);

const App = () => (
  <IntlProvider locale="en">
    <Layout>
      <ConnectedRouter history={history}>
        <React.Fragment>
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
        </React.Fragment>
      </ConnectedRouter>
    </Layout>
  </IntlProvider>
);

export default App;
