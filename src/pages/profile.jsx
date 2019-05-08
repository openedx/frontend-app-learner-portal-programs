import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { PrivateRoute } from '@edx/frontend-auth';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';

import Layout from '../components/Layout/Layout';
import history from '../data/history';
import apiClient from '../data/apiClient';
import { ConnectedProfilePage } from '../components/profile/profile';
import { fetchUserAccount as _fetchUserAccount } from '../components/profile/common';

const Routes = () => (
  <ConnectedRouter history={history}>
    <>
      <PrivateRoute
        path="/u/:username"
        authenticatedAPIClient={apiClient}
        redirect={process.env.BASE_URL}
        component={ConnectedProfilePage}
      />
    </>
  </ConnectedRouter>
);

class Profile extends React.Component {
  state = { loading: true };

  componentDidMount() {
    const { username, fetchUserAccount } = this.props;
    apiClient.ensurePublicOrAuthenticationAndCookies(
      window.location.pathname,
      async () => {
        // TODO: Fix the @edx/frontend-analytics package to not reference window
        // identifyAuthenticatedUser();
        // sendPageEvent();
        await fetchUserAccount(username);
        this.setState({ loading: false });
      },
    );
  }

  // TODO: add an actual skeleton component for loading so there isn't a big transiton
  render() {
    const { loading } = this.state;
    return (
      <IntlProvider locale="en">
        <Layout>{loading ? 'loading...' : <Routes />}</Layout>
      </IntlProvider>
    );
  }
}

Profile.propTypes = {
  fetchUserAccount: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(
  state => ({ username: state.authentication.username }),
  {
    fetchUserAccount: _fetchUserAccount,
  },
)(Profile);
