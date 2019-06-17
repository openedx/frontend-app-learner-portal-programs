import React from 'react';
import { IntlProvider } from 'react-intl';

import Layout from '../components/Layout/Layout';
import MastersTable from '../components/MastersTable/MastersTable';


const MastersList = () => (
  <IntlProvider locale="en">
    <Layout>
      <MastersTable />
    </Layout>
  </IntlProvider>
);
export default MastersList;
