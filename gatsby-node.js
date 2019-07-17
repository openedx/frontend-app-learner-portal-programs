/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

const ProgramPage = path.resolve('./src/components/masters/program/ProgramPage.jsx');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const programs = [
    {
      uuid: '6eefc008-db50-46f0-8746-667f55533a5d',
      name: 'Demo Program',
      slug: 'demo-program',
      hostname: 'http://localhost:8734',
    },
    {
      uuid: '6eefc008-db50-46f0-8746-667f55533a5e',
      name: 'Another Program',
      slug: 'another-program',
      hostname: 'http://localhost:8734',
    },
  ];

  programs.forEach((program) => {
    const {
      slug,
      uuid,
      name,
      hostname,
    } = program;
    createPage({
      path: slug,
      component: ProgramPage,
      context: {
        programSlug: slug,
        programUUID: uuid,
        programName: name,
        programHostname: hostname,
      },
    });
  });
};
