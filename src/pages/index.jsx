import React from 'react';
import { IntlProvider } from 'react-intl';

import withAuthentication from '../components/withAuthentication';
import Layout from '../components/Layout/Layout';
import MastersTable from '../components/MastersTable/MastersTable';


const IndexPage = () => (
  <IntlProvider locale="en">
    <Layout>
      <MastersTable />
    </Layout>
  </IntlProvider>
);

export default withAuthentication(IndexPage);
