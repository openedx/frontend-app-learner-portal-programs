import React from 'react';
import { IntlProvider } from 'react-intl';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/Layout/Layout';
import DashboardHome from '../components/DashboardHome/DashboardHome';

// Add icons to font-awesome library
library.add(fas);

const IndexPage = () => (
  <IntlProvider locale="en">
    <Layout>
      <DashboardHome />
    </Layout>
  </IntlProvider>
);

export default IndexPage;
