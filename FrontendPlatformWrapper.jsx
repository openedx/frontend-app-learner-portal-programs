import React, { useEffect, useState } from 'react';

import 'regenerator-runtime/runtime';
import { messages } from '@edx/frontend-component-footer-edx';
import { AppProvider } from '@edx/frontend-platform/react';
import {
  configure as configureAuth,
  AxiosJwtAuthService,
  getAuthenticatedHttpClient,
  ensureAuthenticatedUser,
  hydrateAuthenticatedUser,
} from '@edx/frontend-platform/auth';
import { mergeConfig, getConfig } from '@edx/frontend-platform/config';
import {
  configure as configureLogging,
  getLoggingService,
  NewRelicLoggingService,
} from '@edx/frontend-platform/logging';
import {
  configure as configureAnalytics,
  SegmentAnalyticsService,
} from '@edx/frontend-platform/analytics';

import {
  configure as configureI18n,
} from '@edx/frontend-platform/i18n';

import store from './src/store';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (process.env.IDP_SLUG) {
      mergeConfig({
        LOGIN_URL: `${process.env.LMS_BASE_URL}/auth/idp_redirect/${process.env.IDP_SLUG}`,
      });
    }

    configureLogging(NewRelicLoggingService, {
      config: getConfig(),
    });

    configureAuth(AxiosJwtAuthService, {
      loggingService: getLoggingService(),
      config: getConfig(),
    });

    // Analytics
    configureAnalytics(SegmentAnalyticsService, {
      config: getConfig(),
      loggingService: getLoggingService(),
      httpClient: getAuthenticatedHttpClient(),
    });

    // Internationalization
    configureI18n({
      messages,
      config: getConfig(),
      loggingService: getLoggingService(),
    });

    ensureAuthenticatedUser().then(() => {
      hydrateAuthenticatedUser().then(() => {
        setReady(true);
      });
    });
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <AppProvider store={store}>{children}</AppProvider>
  );
};
