const fetch = require("node-fetch")

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  console.log("Testing my plugin", configOptions)
  const apiUrl = `http://localhost:18606/api/v1/content/pages/`

    const processPage = page => {
      const nodeId = createNodeId(`wagtail-page-${page.id}`)
      const nodeContent = JSON.stringify(page)
      const nodeData = Object.assign({}, page, {
        id: nodeId,
        parent: null,
        children: [],
        internal: {
          type: `WagtailPage`,
          content: nodeContent,
          contentDigest: createContentDigest(page),
        },
      })
      return nodeData
    }

  // Need to handle auth
  return (
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // For each query result (or 'hit')
      data.items.forEach(page => {
        const nodeData = processPage(page)
        createNode(nodeData)
      })
    })
  )
}
