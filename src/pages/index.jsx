import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PrivateRoute } from '@edx/frontend-auth';

import Layout from '../components/Layout/Layout';

import apiClient from '../data/apiClient';
import store from '../data/store';
import history from '../data/history';

const AppWrapper = () => (
  <Provider store={store}>
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
  </Provider>
);

export default AppWrapper;
