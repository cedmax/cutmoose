/* eslint-disable no-restricted-syntax, no-await-in-loop */

const fs = require('fs')
const download = require('image-downloader')
const contentfulStatic = require('contentful-static')

const save = (data, lang) =>
  fs.writeFileSync(
    `./src/content/${lang}.json`,
    JSON.stringify(data, null, 4),
    { encoding: 'UTF-8' }
  )

const destructureImg = image => {
  const { file: { url, fileName } } = image
  return { url, fileName }
}

async function saveImages (content) {
  for (const item of content) {
    let data

    try {
      data = destructureImg(item.image)
    } catch (e) {
      data = destructureImg(item.image.fields)
    }

    const options = {
      url: `http:${data.url}`,
      dest: `./src/content/images/${data.fileName}`
    }

    await download.image(options)
  }
}

function sync (space, accessToken) {
  contentfulStatic.config({
    space,
    accessToken
  })

  contentfulStatic.sync(async (err, json) => {
    if (err) {
      console.log('contentful-static: data could not be fetched')
      return false
    }

    const languages = Object.keys(json.entries)

    for (const lang of languages) {
      const content = json.entries[lang]
      const projects = content
        .filter(item => item.sys.contentType.sys.id === 'projects')
        .map(item => {
          item.fields.image = item.fields.image.fields
          return item.fields
        })
      const metadata = content
        .filter(item => item.sys.contentType.sys.id === 'metadata')
        .map(item => item.fields)

      save(
        {
          projects,
          metadata,
          artists: content
            .filter(item => item.sys.contentType.sys.id === 'artists')
            .map(item => item.fields)
        },
        lang
      )

      await saveImages(metadata)
      await saveImages(projects)
    }
  })
}

sync(
  '0az211l6jnwm',
  '4e98cba8c1a14d147fed1175bd58986c334bd5f9d6c4b1e6b1ef7bd66eb2081c'
)
