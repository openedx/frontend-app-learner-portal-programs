/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

const programPageType = 'pages.ProgramPage';
const templates = {
  programListPage: path.resolve('./src/components/masters/programs-list/ProgramListPage.jsx'),
  programPage: path.resolve('./src/components/masters/program/ProgramPage.jsx'),
};


const transformProgramPageContext = context => (
  // Transforms GraphQL data into the props expected by the ProgramPage component
  {
    programSlug: context.slug,
    programUUID: context.uuid,
    programName: context.title,
    programHostname: context.hostname,
    programBranding: context.branding,
    programDocuments: context.program_documents,
    programHomepage: context.program_homepage,
  }
);

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions;
  const onlyCreateListingPage = process.env.UNBRANDED_LANDING_PAGE === 'True';

  return graphql(`
  {
    allPage {
      nodes {
        id
        slug
        title
        type
        uuid
        hostname
        program_documents {
          header
          display
          documents {
            display_text
            document
            url
          }
        }
        program_homepage {
          header
          display
          description
          link {
            display_text
            url
          }
        }
        branding {
          cover_image
          banner_border_color
          texture_image
          organization_logo {
            url
            alt
          }
        }
      }
    }
  }  
  `).then((result) => {
    if (result.data) {
      const allProgramsData = result.data.allPage.nodes
        .filter(node => node.type === programPageType)
        .map(transformProgramPageContext);
      // Create landing page
      createPage({
        path: '/',
        component: templates.programListPage,
        context: { programs: allProgramsData },
      });

      if (!onlyCreateListingPage) {
        // Create pages for each program
        allProgramsData.forEach((programData) => {
          createPage({
            path: programData.programSlug,
            component: templates.programPage,
            context: programData,
          });
        });
      }
    }
  });
};
