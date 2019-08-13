/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createPagesWithData } = require('./plugins/gatsby-source-wagtail/createPagesWithData');

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info

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
      createPagesWithData(result, actions);
    }
  });
};
