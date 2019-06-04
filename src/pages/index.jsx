import React from 'react';
import { IntlProvider } from 'react-intl';

import withAuthentication from '../components/withAuthentication';
import Layout from '../components/Layout/Layout';
import DashboardHome from '../components/DashboardHome/DashboardHome';

const IndexPage = () => (
  <IntlProvider locale="en">
    <Layout>
      <DashboardHome />
    </Layout>
  </IntlProvider>
);

export default withAuthentication(IndexPage);
