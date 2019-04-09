module.exports = {
  siteMetadata: {
    logo: 'https://www.edx.org/sites/default/files/open-edx-logo-with-reg.png',
    siteName: 'Open Edx',
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
  ],
};
