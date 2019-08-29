const { templates } = require('./templates');

const validPageTypes = ['pages.ProgramPage', 'pages.EnterprisePage'];

const transformCommonPageContext = ({ type, branding }) => (
  // Transforms GraphQL data into the common props expected
  // by the ProgramPage and EnteprisePage components.
  {
    pageType: type,
    pageBranding: branding,
  }
);

const transformProgramPageContext = context => (
  // Transforms GraphQL data into the props expected by the ProgramPage component
  {
    programSlug: context.slug,
    programUUID: context.uuid,
    programName: context.title,
    programHostname: context.hostname,
    programDocuments: context.program_documents,
    externalProgramWebsite: context.external_program_website,
  }
);

const transformEnterprisePageContext = context => (
  // Transforms GraphQL data into the props expected by the EnterprisePage component
  {
    enterpriseName: context.title,
    enterpriseEmail: context.contact_email,
    enterpriseUUID: context.uuid,
  }
);

function createPagesWithData(result, actions) {
  const { createPage } = actions;
  const onlyCreateListingPage = process.env.UNBRANDED_LANDING_PAGE === 'True';
  const allPagesData = result.data.allPage.nodes
    .filter(node => validPageTypes.indexOf(node.type) !== -1)
    .map((node) => {
      const commonPageContext = transformCommonPageContext(node);
      let pageContext = {};
      if (node.type === 'pages.ProgramPage') {
        pageContext = transformProgramPageContext(node);
      } else if (node.type === 'pages.EnterprisePage') {
        pageContext = transformEnterprisePageContext(node);
      }
      return { ...commonPageContext, ...pageContext };
    });

  // If we spot an enterprise page, create it, and do not create program-related pages
  const firstPageData = allPagesData && allPagesData[0];
  const isEnterprise = firstPageData && firstPageData.pageType === 'pages.EnterprisePage';

  if (isEnterprise) {
    createPage({
      path: '/',
      component: templates.enterpriseDashboardPage,
      context: firstPageData,
    });
  } else {
    const programs = allPagesData.filter(node => node.pageType === 'pages.ProgramPage');
    // Create the program listing page. This page must exist as it
    // handles the redirect to an individual program in the case where
    // only one program exists and the user goes to the `/` path.
    createPage({
      path: '/',
      component: templates.programListPage,
      context: { programs },
    });

    // Create Gatsby pages for each page from portal-designer so long as
    // we are not only building the program listing page.
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
