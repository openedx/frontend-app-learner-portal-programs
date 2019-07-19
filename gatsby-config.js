// used for multiple environments. This allows us to use `gatsby build` with
// different configurations instead of just 'production'
// eg.
// $ ACTIVE_ENV=<env_name> npm run build
const activeEnv =
  process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`,
});

let pagesApiUrl;
if (process.env.UNBRANDED_LANDING_PAGE === true) {
  pagesApiUrl = `${process.env.DESIGNER_BASE_URL}/api/v1/pages/?type=pages.IndexPage,pages.ProgramPage`;
} else {
  pagesApiUrl = `${process.env.DESIGNER_BASE_URL}/api/v1/pages/?hostname=${process.env.HOSTNAME}&type=pages.IndexPage,pages.ProgramPage`;
}

module.exports = {
  siteMetadata: {
    programUUID: 'aa7316ce-1b06-4d4a-b612-7a9c652f2990',
    providerSlug: 'saml-default',
  },
  plugins: [
    {
      resolve: 'gatsby-source-wagtail',
      options: {
        pagesApiUrl,
        useMockData: process.env.USE_MOCK_DATA,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [
          `${__dirname}/node_modules`,
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        whitelist: [
          'BASE_URL',
          'LMS_BASE_URL',
          'LOGIN_URL',
          'LOGOUT_URL',
          'CSRF_TOKEN_API_PATH',
          'REFRESH_ACCESS_TOKEN_ENDPOINT',
          'ACCESS_TOKEN_COOKIE_NAME',
          'USER_INFO_COOKIE_NAME',
          'SEGMENT_KEY',
          'UNBRANDED_LANDING_PAGE',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-helmet',
    },
  ],
};
