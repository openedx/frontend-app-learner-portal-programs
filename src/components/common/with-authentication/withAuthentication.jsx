import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserAccount as _fetchUserAccount, UserAccountApiService } from '@edx/frontend-auth';
import {
  configureAnalytics,
  identifyAuthenticatedUser,
  identifyAnonymousUser,
  initializeSegment,
  sendPageEvent,
} from '@edx/frontend-analytics';
import { configureLoggingService, NewRelicLoggingService } from '@edx/frontend-logging';

import apiClient from '../../../apiClient';

const userAccountApiService = new UserAccountApiService(
  apiClient,
  process.env.LMS_BASE_URL,
);

const withAuthentication = (WrappedComponent) => {
  const ComponentClass = class extends Component {
    static propTypes = {
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
      fetchUserAccount: PropTypes.func.isRequired,
      providerSlug: PropTypes.string.isRequired,
      username: PropTypes.string,
    };

    static defaultProps = {
      username: null,
    };

    state = {
      isLoading: true,
    };

    componentDidMount() {
      const {
        username, location, fetchUserAccount, providerSlug,
      } = this.props;

      if (!providerSlug) {
        apiClient.loginUrl = `${process.env.LMS_BASE_URL}/login`;
        apiClient.ensurePublicOrAuthenticationAndCookies(location.pathname, async () => {
          this.configure();

          await fetchUserAccount(userAccountApiService, username);

          identifyAuthenticatedUser();
          sendPageEvent();
          this.setState({ isLoading: false });
        });
      } else {
        apiClient.loginUrl = `${process.env.LMS_BASE_URL}/auth/idp_redirect/${providerSlug}`;
        apiClient.ensurePublicOrAuthenticationAndCookies(location.pathname, async (accessToken) => {
          this.configure();

          await fetchUserAccount(userAccountApiService, username);

          if (accessToken) {
            identifyAuthenticatedUser(accessToken.user_id);
          } else {
            identifyAnonymousUser();
          }
          sendPageEvent();
          this.setState({ isLoading: false });
        });
      }
    }

    configure() {
      configureLoggingService(NewRelicLoggingService);
      initializeSegment(process.env.SEGMENT_KEY);
      configureAnalytics({
        loggingService: NewRelicLoggingService,
        authApiClient: apiClient,
        analyticsApiBaseUrl: process.env.LMS_BASE_URL,
      });
    }

    render() {
      const { isLoading } = this.state;
      if (isLoading) {
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect(
    state => ({
      username: state.authentication.username,
      hasLoadedUserData: state.userAccount.loaded,
    }),
    { fetchUserAccount: _fetchUserAccount },
  )(ComponentClass);
};

withAuthentication.propTypes = {
  location: PropTypes.string.isRequired,
  providerSlug: PropTypes.string.isRequired,
};

const withSaml = WrappedComponent => (
  props => <WrappedComponent providerSlug={process.env.IDP_SLUG} {...props} />
);

export default WrappedComponent => withSaml(withAuthentication(WrappedComponent));
