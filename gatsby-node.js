const path = require('path');
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@edx/frontend-i18n': path.resolve(__dirname, 'src/profile/i18n'),
      },
    },
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/profile/)) {
    page.matchPath = '/u/:username';
    // Update the page.
    createPage(page);
  }
};
