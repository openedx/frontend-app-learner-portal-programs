import { createPagesWithData } from '../createPagesWithData';
import { templates } from '../templates';

describe('createPagesWithData', () => {
  it('should only create page based on the type in first node in nodes', () => {
    const graphqlQueryResult = {
      data: {
        allPage: {
          nodes: [
            {
              id: '0de66c11-6c9a-538b-aeb6-767f0013c96d',
              slug: null,
              title: 'Example Enterprise',
              type: 'pages.EnterprisePage',
              uuid: '47fc98b8-9a90-406d-854b-a4e91df0bc8c',
              hostname: null,
              program_documents: null,
              external_program_website: null,
              branding: [{}],
            },
            {
              id: '0de66c11-6c9a-538b-aeb6-767f0013c96d',
              slug: null,
              title: 'Some program we should ignore',
              type: 'pages.ProgramPage',
              uuid: '47fc98b8-9a90-406d-854b-a4e91df0bc8c',
              hostname: null,
              program_documents: null,
              external_program_website: null,
              branding: [{}],
            },
          ],
        },
      },
    };
    const actions = { createPage: jest.fn() };

    createPagesWithData(graphqlQueryResult, actions);

    const expectedArgs = {
      path: '/',
      component: templates.enterprisePage,
      context: {
        pageType: 'pages.EnterprisePage',
        enterpriseName: 'Example Enterprise',
        enterpriseBranding: [{}],
      },
    };
    expect(actions.createPage.mock.calls.length).toEqual(1);
    expect(actions.createPage).toBeCalledWith({ ...expectedArgs });
  });

  it('should only create a single programPage if only one programPage is present', () => {
    const graphqlQueryResult = {
      data: {
        allPage: {
          nodes: [
            {
              id: '0de66c11-6c9a-538b-aeb6-767f0013c96d',
              slug: 'prog-slug',
              title: 'The best program ever',
              type: 'pages.ProgramPage',
              uuid: '47fc98b8-9a90-406d-854b-a4e91df0bc8c',
              hostname: null,
              program_documents: null,
              external_program_website: null,
              branding: [{}],
            },
            {
              id: '0de66c11-6c9a-538b-aeb6-767f0013c96d',
              slug: null,
              title: 'Example Enterprise',
              type: 'pages.EnterprisePage',
              uuid: '47fc98b8-9a90-406d-854b-a4e91df0bc8c',
              hostname: null,
              program_documents: null,
              external_program_website: null,
              branding: [{}],
            },
          ],
        },
      },
    };
    const actions = { createPage: jest.fn() };

    createPagesWithData(graphqlQueryResult, actions);

    const expectedArgs = {
      path: 'prog-slug',
      component: templates.programPage,
      context: {
        pageType: 'pages.ProgramPage',
        programSlug: 'prog-slug',
        programUUID: '47fc98b8-9a90-406d-854b-a4e91df0bc8c',
        programName: 'The best program ever',
        programHostname: null,
        programBranding: [{}],
        programDocuments: null,
        externalProgramWebsite: null,
      },
    };
    expect(actions.createPage.mock.calls.length).toEqual(1);
    expect(actions.createPage).toBeCalledWith({ ...expectedArgs });
  });

  it('should create list page if multiple programsPage nodes exist.', () => {
    const graphqlQueryResult = {
      data: {
        allPage: {
          nodes: [
            {
              id: '0de66c11-6c9a-538b-aeb6-767f0013c96d',
              slug: 'prog-slug-1',
              title: 'Program 1',
              type: 'pages.ProgramPage',
              uuid: '47fc98b8-9a90-406d-854b-a4e91df0bc8c',
              hostname: null,
              program_documents: null,
              external_program_website: null,
              branding: [{}],
            },
            {
              id: '0de66c11-6c9a-538b-aeb6-767f0013c96a',
              slug: 'prog-slug-2',
              title: 'Program 2',
              type: 'pages.ProgramPage',
              uuid: '47fc98b8-9a90-406d-854b-a4e91df0bc8d',
              hostname: null,
              program_documents: null,
              external_program_website: null,
              branding: [{}],
            },
          ],
        },
      },
    };
    const actions = { createPage: jest.fn() };

    createPagesWithData(graphqlQueryResult, actions);

    const expectedContext = {
      programs: [
        {
          externalProgramWebsite: null,
          pageType: 'pages.ProgramPage',
          programBranding: [{}],
          programDocuments: null,
          programHostname: null,
          programUUID: '47fc98b8-9a90-406d-854b-a4e91df0bc8c',
          programName: 'Program 1',
          programSlug: 'prog-slug-1',
        },
        {
          externalProgramWebsite: null,
          pageType: 'pages.ProgramPage',
          programBranding: [{}],
          programDocuments: null,
          programHostname: null,
          programUUID: '47fc98b8-9a90-406d-854b-a4e91df0bc8d',
          programName: 'Program 2',
          programSlug: 'prog-slug-2',
        },
      ],
    };
    const expectedArgs = {
      path: '/',
      component: templates.programListPage,
      context: expectedContext,
    };
    expect(actions.createPage.mock.calls.length).toEqual(3);
    expect(actions.createPage).toHaveBeenNthCalledWith(1, { ...expectedArgs });
  });

  it('should only create list page (and no program pages) if onlyCreateListingPage is true', () => {
    const graphqlQueryResult = {
      data: {
        allPage: {
          nodes: [
            {
              id: '0de66c11-6c9a-538b-aeb6-767f0013c96d',
              slug: 'prog-slug-1',
              title: 'Program 1',
              type: 'pages.ProgramPage',
              uuid: '47fc98b8-9a90-406d-854b-a4e91df0bc8c',
              hostname: null,
              program_documents: null,
              external_program_website: null,
              branding: [{}],
            },
            {
              id: '0de66c11-6c9a-538b-aeb6-767f0013c96a',
              slug: 'prog-slug-2',
              title: 'Program 2',
              type: 'pages.ProgramPage',
              uuid: '47fc98b8-9a90-406d-854b-a4e91df0bc8d',
              hostname: null,
              program_documents: null,
              external_program_website: null,
              branding: [{}],
            },
          ],
        },
      },
    };
    const actions = { createPage: jest.fn() };
    process.env.UNBRANDED_LANDING_PAGE = 'True';

    createPagesWithData(graphqlQueryResult, actions);

    const expectedContext = {
      programs: [
        {
          externalProgramWebsite: null,
          pageType: 'pages.ProgramPage',
          programBranding: [{}],
          programDocuments: null,
          programHostname: null,
          programUUID: '47fc98b8-9a90-406d-854b-a4e91df0bc8c',
          programName: 'Program 1',
          programSlug: 'prog-slug-1',
        },
        {
          externalProgramWebsite: null,
          pageType: 'pages.ProgramPage',
          programBranding: [{}],
          programDocuments: null,
          programHostname: null,
          programUUID: '47fc98b8-9a90-406d-854b-a4e91df0bc8d',
          programName: 'Program 2',
          programSlug: 'prog-slug-2',
        },
      ],
    };
    const expectedArgs = {
      path: '/',
      component: templates.programListPage,
      context: expectedContext,
    };
    expect(actions.createPage.mock.calls.length).toEqual(1);
    expect(actions.createPage).toBeCalledWith({ ...expectedArgs });
  });
});
