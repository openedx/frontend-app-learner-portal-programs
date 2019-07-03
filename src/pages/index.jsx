import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { IntlProvider } from 'react-intl';

import withAuthentication from '../components/common/withAuthentication';
import { ProgramsListPage } from '../components/masters/programs-list';

const UserProgramsQuery = graphql`
  query {
    allSitePage {
      edges {
        node {
          context  {
            programUUID
            programName
            programSlug
            programHostname
          }
        }
      }
    }
  }
`;

const IndexPage = props => (
  <IntlProvider locale="en">
    <StaticQuery
      query={UserProgramsQuery}
      render={data => (
        <ProgramsListPage programQueryData={data.allSitePage.edges} {...props} />
      )}
    />
  </IntlProvider>
);

export default withAuthentication(IndexPage);
