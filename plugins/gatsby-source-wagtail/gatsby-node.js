const fetch = require('node-fetch');
const mockData = require('./test/mock.json');

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions,
) => {
  const { createNode } = actions;
  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins; // eslint-disable-line
  const fetchBrandingData = async () => {
    // switch to load mock data from the cms for testing purposes.
    // set "useMockData" to true in this plugins options in the gatsby-config
    // mock data lives at './test/mock.json'
    if (configOptions.useMockData) {
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
