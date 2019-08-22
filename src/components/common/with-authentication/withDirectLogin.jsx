import React from 'react';
import { compose } from 'recompose';
import withAuthentication from './withAuthentication';

const withDirectLogin = WrappedComponent => (
  props => (<WrappedComponent
    loginUrl={`${process.env.LMS_BASE_URL}/login`}
    {...props}
  />)
);

export default compose(
  withDirectLogin,
  withAuthentication,
);
