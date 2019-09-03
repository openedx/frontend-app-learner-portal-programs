/**
 * This files adds support for features enabled by a `features` query parameter
 * enables the following:
 *   - work in smaller increments on a single feature, without exposing
 *     released code of said feature to users prematurely.
 *   - enable testing & dark launch of full feature on stage/production before
 *     released to users.
 */

import qs from 'query-string';

export const getFeaturesFromQueryParams = () => {
  const params = qs.parse(global.location.search);
  if (!params || typeof params !== 'object') {
    return null;
  }
  return params.features;
};

export const isFeatureEnabled = (feature) => {
  const features = getFeaturesFromQueryParams();
  return !!(features && features.indexOf(feature) !== -1);
};
