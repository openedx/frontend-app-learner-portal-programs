require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    logo: 'https://www.edx.org/sites/default/files/open-edx-logo-with-reg.png',
    siteName: 'Open Edx',
    siteUrl: 'https://www.edx.org/',
    programs: [
      {
        uuid: '6eefc008-db50-46f0-8746-667f55533a5d',
        name: 'Example Program',
        slug: 'exampleprogram',
      },
      {
        uuid: '6eefc008-db50-46f0-8746-667f55533a5d',
        name: 'Another Program',
        slug: 'another-program',
      },
    ],
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
