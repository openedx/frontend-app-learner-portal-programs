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

import apiClient from '../../data/apiClient';

const withAuthentication = (WrappedComponent) => {
  const ComponentClass = class extends Component {
    static propTypes = {
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
      fetchUserAccount: PropTypes.func.isRequired,
      username: PropTypes.string,
    };

    static defaultProps = {
      username: null,
    };

    state = {
      isLoading: true,
    };

    componentDidMount() {
      const { username, location, fetchUserAccount } = this.props;

      apiClient.ensurePublicOrAuthenticationAndCookies(location.pathname, async (accessToken) => {
        configureLoggingService(NewRelicLoggingService);
        initializeSegment(process.env.SEGMENT_KEY);
        configureAnalytics({
          loggingService: NewRelicLoggingService,
          authApiClient: apiClient,
          analyticsApiBaseUrl: process.env.LMS_BASE_URL,
        });

        const userAccountApiService = new UserAccountApiService(
          apiClient,
          process.env.LMS_BASE_URL,
        );
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

    render() {
      const { isLoading } = this.state;
      if (isLoading) {
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect(
    state => ({ username: state.authentication.username }),
    { fetchUserAccount: _fetchUserAccount },
  )(ComponentClass);
};

withAuthentication.propTypes = {
  location: PropTypes.string.isRequired,
};

export default withAuthentication;
