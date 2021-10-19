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
// All env vars will be passed in as strings
if (process.env.UNBRANDED_LANDING_PAGE === 'True') {
  pagesApiUrl = `${process.env.DESIGNER_BASE_URL}/api/v1/pages/?type=pages.ProgramPage`;
} else {
  pagesApiUrl = `${process.env.DESIGNER_BASE_URL}/api/v1/pages/?hostname=${process.env.HOSTNAME}&type=pages.ProgramPage`;
}

module.exports = {
  pathPrefix: `${process.env.ENABLE_PATH_PREFIX ? process.env.HOSTNAME : '/'}`,
  plugins: [
    {
      resolve: '@edx/gatsby-source-portal-designer',
      options: {
        pagesApiUrl,
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
          'ENTERPRISE_CATALOG_MFE_URL',
          'ORDERS_MFE_URL',
          'LMS_BASE_URL',
          'ECOMMERCE_BASE_URL',
          'LOGIN_URL',
          'LOGOUT_URL',
          'LOGO_URL',
          'LOGO_TRADEMARK_URL',
          'LOGO_WHITE_URL',
          'FAVICON_URL',
          'CSRF_TOKEN_API_PATH',
          'REFRESH_ACCESS_TOKEN_ENDPOINT',
          'ACCESS_TOKEN_COOKIE_NAME',
          'USER_INFO_COOKIE_NAME',
          'SEGMENT_KEY',
          'UNBRANDED_LANDING_PAGE',
          'IDP_SLUG',
          'ENABLE_PATH_PREFIX',
          'ENABLE_NOTICES',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Inter:400,500,700',
          'Roboto Mono',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-react-helmet',
    },
  ],
};
