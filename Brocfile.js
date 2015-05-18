var md2json = require('./index');

var concatenated = md2json('./data', {
    inputFiles: ['*.md', '**/*.md'],
    destDir: 'api/',
    indexData: ['title', 'someOtherMetaData', 'featuredImgUrl']
});

module.exports = concatenated;
