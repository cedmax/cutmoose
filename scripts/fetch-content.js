/* eslint-disable no-restricted-syntax, no-await-in-loop */

require('dotenv').config()
const fs = require('fs')
const download = require('image-downloader')
const contentfulStatic = require('contentful-static')

const save = (data, lang) =>
  fs.writeFileSync(`./src/content/${lang}.json`, JSON.stringify(data, null, 4), {
    encoding: 'UTF-8'
  })

const destructureImg = image => {
  const {
    file: { url, fileName }
  } = image
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
        .sort((a, b) => a.order - b.order)

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

sync(process.env.CONTENTFUL_SPACE, process.env.CONTENTFUL_KEY)
