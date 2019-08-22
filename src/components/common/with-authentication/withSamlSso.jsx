import React from 'react';
import { compose } from 'recompose';
import withAuthentication from './withAuthentication';

const withSamlSso = WrappedComponent => (
  props => (<WrappedComponent
    loginUrl={`${process.env.LMS_BASE_URL}/auth/idp_redirect/${process.env.IDP_SLUG}`}
    {...props}
  />)
);

export default compose(
  withSamlSso,
  withAuthentication,
);
