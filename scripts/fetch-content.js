require('dotenv').config();
const _ = require('lodash');
const fs = require('fs');
const download = require('image-downloader')
const contentfulStatic = require('contentful-static');

const save = (data, lang) => fs.writeFileSync(
  `./content/${lang}.json`, 
  JSON.stringify(data, null, 4), 
  { encoding: 'UTF-8'}
)

async function saveImages(content) {
  for (let item of content) {
    const { image: { file: { url, fileName } } } = item
    const options = {
      url: `http:${url}`,
      dest: `./content/images/${fileName}`
    }

    const image = await download.image(options);
  }
}

function sync(space, accessToken) {
  contentfulStatic.config({
    space,
    accessToken
  });

  contentfulStatic.sync(async (err, json) => {
      if(err) {
        console.log('contentful-static: data could not be fetched');
        return false;
      }

      const languages = Object.keys(json.entries);
      
      for (let lang of languages) {
        const content = json.entries[lang];
        const projects = content.filter((item) => item.sys.contentType.sys.id ==='projects').map(item => {
          item.fields.image = item.fields.image.fields
          return item.fields
        })
        
        save({
          projects, 
          artists: content.filter((item) => item.sys.contentType.sys.id ==='artists').map(item => item.fields),
          metadata: content.filter((item) => item.sys.contentType.sys.id ==='metadata').map(item => item.fields)
        }, lang)

        await saveImages(projects)
      }
  });
}

sync(
  process.env.CONTENTFUL_SPACE,
  process.env.CONTENTFUL_KEY
)
