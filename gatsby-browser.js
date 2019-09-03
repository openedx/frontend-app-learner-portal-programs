import { configureAnalytics } from '@edx/frontend-analytics';
import { configureLoggingService, NewRelicLoggingService } from '@edx/frontend-logging';
import { configureProfileApiService } from '@edx/frontend-app-profile';
import { configure as configureI18n } from '@edx/frontend-i18n';

import apiClient from './src/apiClient';
import { configuration } from './environment';
import wrapWithProvider from './wrap-with-provider';

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = wrapWithProvider;

export const onClientEntry = () => {
  console.log('We have started!!!');
  configureI18n(configuration, {});
  configureProfileApiService(configuration, apiClient);
  configureLoggingService(NewRelicLoggingService);
  configureAnalytics({
    loggingService: NewRelicLoggingService,
    authApiClient: apiClient,
    analyticsApiBaseUrl: process.env.LMS_BASE_URL,
  });
};
