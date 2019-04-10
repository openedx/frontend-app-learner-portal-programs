import React from 'react';
import { IntlProvider } from 'react-intl';
import Layout from '../components/Layout/Layout';

const IndexPage = () => (
  <IntlProvider locale="en">
    <Layout />
  </IntlProvider>
);

export default IndexPage;
