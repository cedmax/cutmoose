require('dotenv').config()

const path = require('path')
const config = require('./src/utils/siteConfig')
const generateRSSFeed = require('./src/utils/rss/generate-feed')

const ghostConfig = {
  apiUrl: process.env.GHOST_API_URL,
  contentApiKey: process.env.GHOST_CONTENT_API_KEY,
}

const { apiUrl, contentApiKey } = ghostConfig

if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
  // eslint-disable-next-line
  throw new Error(
    'GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.',
  )
}

if (
  process.env.NODE_ENV === 'production' &&
  config.siteUrl === 'http://localhost:8000' &&
  !process.env.SITEURL
) {
  // eslint-disable-next-line
  throw new Error(
    "siteUrl can't be localhost and needs to be configured in siteConfig. Check the README.",
  )
}

/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
    },

    /**
     *  Content Plugins
     */
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'https://platform.twitter.com/widgets.js',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src', 'pages'),
        name: 'pages',
      },
    },
    // Setup for optimised images.
    // See https://www.gatsbyjs.org/packages/gatsby-image/
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src', 'images'),
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-ghost',
      options: ghostConfig,
    },
    {
      resolve: 'gatsby-plugin-remote-images',
      options: {
        nodeType: 'GhostPost',
        imagePath: 'feature_image',
      },
    },
    {
      resolve: 'gatsby-transformer-rehype',
      options: {
        filter: node => node.internal.type === 'GhostPost',
        plugins: [
          { resolve: 'gatsby-rehype-prismjs' },
          {
            resolve: 'gatsby-rehype-inline-images',

            // all options are optional and can be omitted
            options: {
              // all images larger are scaled down to maxWidth (default: maxWidth = imageWidth)
              // maxWidth: 2000,
              withWebp: true,
              // disable, if you need to save memory
              useImageCache: true,
            },
          },
        ],
      },
    },
    /**
     *  Utility Plugins
     */
    {
      resolve: 'gatsby-plugin-ghost-manifest',
      options: {
        short_name: config.shortTitle,
        start_url: '/',
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icon: `static/${config.siteIcon}`,
        legacy: true,
        query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
        feeds: [generateRSSFeed(config)],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-force-trailing-slashes',
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/p/*`] },
    },
  ],
}
