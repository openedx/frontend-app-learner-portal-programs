/* eslint-disable no-console */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createPagesWithData } = require('./plugins/gatsby-source-wagtail/createPagesWithData');

// **Note:** The graphql function call returns a Promise
// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
exports.createPages = async ({ graphql, actions }) => graphql(`
  {
    allPage {
      nodes {
        id
        slug
        title
        type
        uuid
        hostname
        contact_email
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
  `)
  .then((result) => {
    if (result && result.data) {
      createPagesWithData(result, actions);
    } else {
      console.error('GraphQL query for fetching page nodes returned no data.');
    }
  })
  .catch((error) => {
    console.error('An error occurred while fetching page nodes from GraphQL', error);
  });
