require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    logo: 'https://www.edx.org/sites/default/files/open-edx-logo-with-reg.png',
    siteName: 'Open Edx',
    siteUrl: 'https://www.edx.org/',
    programUUID: '057ca1fb-558c-44b6-84b5-c367eaedf662',
  },
  plugins: [
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
        ],
      },
    },
  ],
};
