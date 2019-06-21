import React from 'react';

import withAuthentication from '../components/withAuthentication';
import ProgramsTable from '../components/ProgramsTable/ProgramsTable';


const IndexPage = () => (
  <ProgramsTable />
);

export default withAuthentication(IndexPage);
