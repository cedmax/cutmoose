const GhostAdminAPI = require('@tryghost/admin-api')

const ghostConfig = {
  apiUrl: process.env.GHOST_API_URL,
  adminApiKey: process.env.GHOST_ADMIN_API_KEY,
}

const api = new GhostAdminAPI({
  url: ghostConfig.apiUrl,
  key: ghostConfig.adminApiKey,
  version: `v3`,
})

exports.handler = async event => {
  try {
    if (!event.queryStringParameters.id) {
      throw new Error('The post id is missing')
    }

    const browseParams = {
      filter: `uuid:${event.queryStringParameters.id}`,
      formats: 'html',
    }

    const post = (await api.posts.browse(browseParams))[0]

    return {
      statusCode: 200,
      body: JSON.stringify(post),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
