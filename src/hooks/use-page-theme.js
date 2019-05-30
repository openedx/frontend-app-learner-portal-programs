import { useStaticQuery, graphql } from "gatsby"

const mergeBranding = (siteBranding, pageBranding) => {
  let branding = {};
  Object.keys(siteBranding).forEach(key => {
    // Ignore empty or undefined values.
    branding[key] = pageBranding[key] ? pageBranding[key] : siteBranding[key];
  })
  return branding;
}

export default (slug) => {
  const branding = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            branding {
              logo
              siteName
            }
            subpages {
              slug
              branding {
                logo
                siteName
              }
            }
          }
        }
      }
    `
  )
  var siteBranding = branding.site.siteMetadata.branding;
  if (slug === undefined) {
    return siteBranding;
  }
  var pageBranding = branding.site.siteMetadata.subpages.find(page => page.slug === slug).branding;
  return mergeBranding(siteBranding, pageBranding);
}
