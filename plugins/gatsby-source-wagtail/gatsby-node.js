const fetch = require('node-fetch');
const mockData = require('./test/mock.json');
const typedefs = require('./schema/types.gql');

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions,
) => {
  const { createNode, createTypes } = actions;
  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins; // eslint-disable-line

  // This creates default types for the graphql nodes so that queries do not
  // break while building pages. If nested types are added to the designer
  // backend, they will most likely need to be added to the schema.
  createTypes(typedefs);

  const fetchBrandingData = async () => {
    // switch to load mock data from the cms for testing purposes.
    // set "useMockData" to true in this plugins options in the gatsby-config
    // mock data lives at './test/mock.json'
    if (process.env.USE_MOCK_DATA) {
      console.warn('Using fake designer data...');
      return mockData;
    }
    try {
      const response = await fetch(configOptions.pagesApiUrl);
      return await response.json();
    } catch (e) {
      return console.error(`${e.name}: ${e.message}`); // eslint-disable-line
    }
  };

  // the gatsby node shape will be the exact same as what the api returns.
  const processNode = (node, nodeType) => createNode({
    ...node,
    id: createNodeId(`wagtail-node-${node.id}`),
    internal: {
      type: nodeType,
      contentDigest: createContentDigest(node),
    },
  });

  const data = await fetchBrandingData();
  if (data && data.length) {
    data.map(page => processNode(page, 'page'));
  } else {
    // no branding data was found
    console.error(`No branding data was returned from ${process.env.HOSTNAME}`); // eslint-disable-line
  }
};
