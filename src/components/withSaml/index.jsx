import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

const withSamlQuery = graphql`
  query SamlQuery {
    site {
      siteMetadata {
        providerSlug
      }
    }
  }
`;

const withSaml = WrappedComponent => (
  props => (
    <StaticQuery
      query={withSamlQuery}
      render={data => (
        <WrappedComponent providerSlug={data.site.siteMetadata.providerSlug} {...props} />
      )}
    />
  )
);

export default withSaml;
