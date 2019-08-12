/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

const validPageTypes = ['pages.ProgramPage', 'pages.EnterprisePage'];
const templates = {
  programListPage: path.resolve('./src/components/masters/programs-list/ProgramListPage.jsx'),
  programPage: path.resolve('./src/components/masters/program/ProgramPage.jsx'),
  enterprisePage: path.resolve('./src/components/enterprise/EnterprisePage.jsx'),
};


const transformProgramPageContext = context => (
  // Transforms GraphQL data into the props expected by the ProgramPage component
  {
    pageType: context.type,
    programSlug: context.slug,
    programUUID: context.uuid,
    programName: context.title,
    programHostname: context.hostname,
    programBranding: context.branding,
    programDocuments: context.program_documents,
    externalProgramWebsite: context.external_program_website,
  }
);

const transformEnterprisePageContext = context => (
  // Transforms GraphQL data into the props expected by the EnterprisePage component
  {
    pageType: context.type,
    enterpriseName: context.title,
    enterpriseBranding: context.branding,
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
        external_program_website {
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
      const allPagesData = result.data.allPage.nodes
        .filter(node => validPageTypes.indexOf(node.type) !== -1)
        .map((node) => {
          if (node.type === 'pages.ProgramPage') {
            return transformProgramPageContext(node);
          } else if (node.type === 'pages.EnterprisePage') {
            return transformEnterprisePageContext(node);
          }
          return node;
        });

      const hasMultiplePrograms = allPagesData.filter(node => node.type === 'pages.ProgramPage');

      if (hasMultiplePrograms && hasMultiplePrograms.length > 1) {
        // Create landing page
        createPage({
          path: '/',
          component: templates.programListPage,
          context: { programs: allPagesData },
        });
      }

      if (!onlyCreateListingPage) {
        // Create pages for each program
        allPagesData.forEach((pageData) => {
          const isEnterprise = pageData.pageType === 'pages.EnterprisePage';
          const template = isEnterprise ? templates.enterprisePage : templates.programPage;

          createPage({
            path: isEnterprise ? '/' : pageData.programSlug,
            component: template,
            context: pageData,
          });
        });
      }
    }
  });
};
