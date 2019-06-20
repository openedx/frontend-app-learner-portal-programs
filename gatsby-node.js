/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

const DashboardHome = path.resolve('./src/components/DashboardHome/DashboardHome.jsx');

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app\//)) {
    // eslint-disable-next-line no-param-reassign
    page.matchPath = '/app/*';

    // Update the page.
    createPage(page);
  }
};
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const programs = graphql(`
  query {
    site {
      siteMetadata {
        programs {
          uuid,
          name,
          slug
        }
      }
    }
  }
  `);

  programs.forEach((program) => {
    const { slug, uuid, name } = program;
    createPage({
      path: slug,
      component: DashboardHome,
      context: {
        programSlug: slug,
        programUUID: uuid,
        programName: name,
      },
    });
  });
};
