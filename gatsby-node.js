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

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const programs = [
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
  ];

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
