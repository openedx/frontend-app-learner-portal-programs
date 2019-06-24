import React from 'react';
import { IntlProvider } from 'react-intl';
import { StaticQuery, graphql } from 'gatsby';

import withAuthentication from '../components/withAuthentication';
import Layout from '../components/Layout/Layout';
import ProgramsTable from '../components/ProgramsTable/ProgramsTable';

const UserProgramsQuery = graphql`
  query {
    allSitePage {
      edges {
        node {
          context  {
            programUUID
            programName
          }
        }
      }
    }
  }
`;

const IndexPage = props => (
  <IntlProvider locale="en">
    <Layout>
      <StaticQuery
        query={UserProgramsQuery}
        render={data => (
          <ProgramsTable programQueryData={data.allSitePage.edges} {...props} />
        )}
      />
    </Layout>
  </IntlProvider>
);

export default withAuthentication(IndexPage);
