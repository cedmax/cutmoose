/* ~/www/project-x/version.js */
const Version = require('node-version-assets');
const versionInstance = new Version({
  assets: [ 'dist/style.css' ],
  grepFiles: [ 'dist/*.html' ]
});
versionInstance.run();