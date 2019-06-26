import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import withAuthentication from '../components/withAuthentication';
import ProgramsTable from '../components/ProgramsTable/ProgramsTable';

const UserProgramsQuery = graphql`
  query {
    allSitePage {
      edges {
        node {
          context  {
            programUUID
            programName
            programSlug
          }
        }
      }
    }
  }
`;

const IndexPage = props => (
  <StaticQuery
    query={UserProgramsQuery}
    render={data => (
      <ProgramsTable programQueryData={data.allSitePage.edges} {...props} />
        )}
  />
);

export default withAuthentication(IndexPage);
