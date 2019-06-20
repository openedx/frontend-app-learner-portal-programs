import React from 'react';
import { IntlProvider } from 'react-intl';

import withAuthentication from '../components/withAuthentication';
import Layout from '../components/Layout/Layout';
import ProgramsTable from '../components/ProgramsTable/ProgramsTable';


const IndexPage = () => (
  <IntlProvider locale="en">
    <Layout>
      <ProgramsTable />
    </Layout>
  </IntlProvider>
);

export default withAuthentication(IndexPage);
