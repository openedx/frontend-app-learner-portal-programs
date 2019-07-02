/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

const DashboardHome = path.resolve('./src/components/DashboardHome/DashboardHome.jsx');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const programs = [
    {
      uuid: '6eefc008-db50-46f0-8746-667f55533a5d',
      name: 'Example Program',
      slug: 'exampleprogram',
    },
    {
      uuid: '6eefc008-db50-46f0-8746-667f55533a5e',
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
