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

  render() {
    if (this.state.loading) {
      // TODO: Set up an actual spinner for this
      return <>Loading...</>;
    }
    return (
      <IntlProvider locale="en">
        <Layout>
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
        </Layout>
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
