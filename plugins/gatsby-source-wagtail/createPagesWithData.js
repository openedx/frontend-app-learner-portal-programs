const { templates } = require('./templates');

const validPageTypes = ['pages.ProgramPage', 'pages.EnterprisePage'];

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

function createPagesWithData(result, actions) {
  const { createPage } = actions;
  const onlyCreateListingPage = process.env.UNBRANDED_LANDING_PAGE === 'True';
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

  // If we spot an enterprise page, create it, and do not create programs pages
  const firstPageData = allPagesData && allPagesData[0];
  const isEnterprise = firstPageData && firstPageData.pageType === 'pages.EnterprisePage';
  if (isEnterprise) {
    createPage({
      path: '/',
      component: templates.enterprisePage,
      context: firstPageData,
    });
  } else {
    // Create landing page if there are multiple programs pages
    const programs = allPagesData.filter(node => node.pageType === 'pages.ProgramPage');
    if (programs && programs.length > 1) {
      createPage({
        path: '/',
        component: templates.programListPage,
        context: { programs },
      });
    }
    // Create Gatsby pages for each page from portal-designer so long as
    // we are not only building the listings
    if (!onlyCreateListingPage) {
      programs.forEach((pageData) => {
        createPage({
          path: pageData.programSlug,
          component: templates.programPage,
          context: pageData,
        });
      });
    }
  }
}

exports.createPagesWithData = createPagesWithData;
