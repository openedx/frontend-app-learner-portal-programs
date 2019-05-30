require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    branding: {
      logo: "https://via.placeholder.com/150/0000FF",
      siteName: "HomeSite"
    },
    subpages: [
      {
        slug: "page1",
        branding: {
          logo: "https://via.placeholder.com/150/FF00FF",
        }
      },
      {
        slug: "page2",
        branding: {
          logo: "https://via.placeholder.com/150/FF00",
          siteName: "Page2Site"
        },
      },
    ]
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
