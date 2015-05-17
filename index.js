var fs = require('fs');
var path = require('path');
var brocWriter = require('broccoli-writer');
var brocFilter = require('broccoli-filter');
var brocHelpers = require("broccoli-kitchen-sink-helpers");
var marked = require('marked');
var yaml = require('js-yaml');



var Md2Json = function Md2Json(inTree,options) {
    if (!(this instanceof Md2Json)) {
        return new Md2Json(inTree, options);
    }

    this.inTree = inTree;
    this.options = options || {};
    this.destDir = this.destDir || '/';

    // this.outputFile = "fc2.json";
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            this[key] = options[key];
        }
    }
};

Md2Json.prototype = Object.create(brocWriter.prototype);

Md2Json.prototype.constructor = Md2Json;

Md2Json.prototype.description = 'test-plugin';

var loadFile = function (ymlName) {
    var data = fs.readFileSync(ymlName, "utf8");
    var dividerPos = data.indexOf("\n---\n");

    var item = yaml.safeLoad(data.substr(0, dividerPos));
    item.description = marked(data.substr(dividerPos + 6));
    return item;
};

Md2Json.prototype.write = function(readTree, destDir) {
    var self = this;    
    return readTree(this.inTree).then(function (srcDir) {

    /* use srcDir and information from self.options to figure out which files to read from */
    /* use destDir and information from self.options to figure outwhich files to write to */
    /* synchronously read input files, do some processing, and write output files */
    
        var index = [];

        var destPath   = path.join(destDir, self.options.destDir);
        
        if (destPath[destPath.length -1] === '/') {
            destPath = destPath.slice(0, -1);
        }

        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath);
        }

        // find all files matching inputFiles option (**/*) in inputTree directory (srcDir = ./data in our example).
        var inputFiles = brocHelpers.multiGlob(self.inputFiles, { cwd: srcDir });
        // inputFiles is an array with the names of the files found, with extension.
        // unlike glob, multiGlob does not return the path of the files, only their names.

        inputFiles.forEach(function (file) {
            //get the complete path of each file. It will be srcDir/name-of-tile.extension
            var filePath = path.join(srcDir, file);
            var fileName = file.replace('.md', '');
            
            // make sure that the files are files.

            var stat = fs.statSync(filePath);

            if (stat && stat.isFile()) {
                var project = loadFile(filePath);
                fs.writeFileSync(path.join(destPath, fileName + '.json'), JSON.stringify(project));
                index.push(
                    {
                        title: project.title,
                        someOtherMetaData : project.someOtherMetaData,
                        featuredImgUrl: project.featuredImgUrl,
                        slug: fileName
                    });
            }

            
        });

        fs.writeFileSync(path.join(destPath, 'index.json'), JSON.stringify(index));
  });
};


module.exports = Md2Json;
