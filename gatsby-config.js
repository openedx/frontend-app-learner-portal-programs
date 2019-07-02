require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const pagesApiUrl = `${process.env.DESIGNER_BASE_URL}/api/v1/pages/?hostname=${process.env.HOSTNAME}`;

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
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-helmet',
    },
  ],
};
