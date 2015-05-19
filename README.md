# Broccoli MD to JSON

Converts each individual markdown files into an individual json file. This plugin also generates an index.json containing a selected set of data from all markdown files.


** ! This is a work in progress ! **

This plugin is part of my workflow to use Ember-Cli without a back-end, for prototyping purposes. More info coming up soon.


## Installation

This plugin isn't published on npm (yet). To use this, install using the tarball url `npm install <tarball url>`

```
npm install https://github.com/emache/broccoli-md-to-json/tarball/master --save-dev  
```

## Description

If the structure of all your markdown files is as follow:

```markdown
title: This project has a fancy title
author: Jimmy
headline: Because it's so special
anyOtherProperty: Add as many property as you like and name them as you like.
---

### Content text here
```

The plugin will create a Json file looking like this for each markdown file:

```Javascript
{"title":"This project has a fancy title","author":"Jimmy","headline":"Because it's so special","description":"<h3>Content text here</h3>"}
```

AND it will generate an `index.json` file which contains information for all the markdown file. Which information is included in the file is controlled through the plugin options. A slug property is also generated using the original markdown file name.

```javascript
[{"title":"This project has a fancy title", "author":"Jimmy","headline":"Because it's so special","slug":"project-1-name"},
```

## Usage

Setting the plugin in your `Brocfile.js` should be:

```javascript
var md2json = require('broccoli-md-to-json');

var convertedFiles = md2json('./data', {
    inputFiles: ['*.md'],
    destDir: 'api/projects/',
    indexData: ['title', 'author', 'headline']
});

module.exports = convertedFiles;
```

Choose indexData based on the structure of your markdown files.

