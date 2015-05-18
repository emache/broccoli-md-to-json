var fs = require('fs');
var path = require('path');
var brocWriter = require('broccoli-writer');
var brocHelpers = require("broccoli-kitchen-sink-helpers");
var marked = require('marked');
var yaml = require('js-yaml');



var Md2Json = function Md2Json(inTree,options) {
    if (!(this instanceof Md2Json)) {
        return new Md2Json(inTree, options);
    }

    this.inTree = inTree;
    this.options = options || {};

    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            this[key] = options[key];
        }
    }
};

Md2Json.prototype = Object.create(brocWriter.prototype);

Md2Json.prototype.constructor = Md2Json;

Md2Json.prototype.description = 'test-plugin';

Md2Json.prototype.write = function(readTree, destDir) {
    var self = this;
    return readTree(this.inTree).then(function (srcDir) {

        var index = [];

        var destPath   = path.join(destDir, self.options.destDir);
        
        if (destPath[destPath.length -1] === '/') {
            destPath = destPath.slice(0, -1);
        }

        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath);
        }

        var inputFiles = brocHelpers.multiGlob(
            self.inputFiles,
            { cwd: srcDir }
        );

        inputFiles.forEach(function (file) {
            
            var filePath = path.join(srcDir, file);
            var fileName = file.replace('.md', '');

            var stat = fs.statSync(filePath);

            if (stat && stat.isFile()) {
                var item = loadFile(filePath);
                fs.writeFileSync(
                    path.join(destPath, fileName + '.json'),
                    JSON.stringify(item)
                );
                
                generateIndex(self.options.indexData, fileName, item, index);
            }
        });

        fs.writeFileSync(
            path.join(destPath, 'index.json'),
            JSON.stringify(index)
        );
  });
};

var loadFile = function (ymlName) {
    var data = fs.readFileSync(ymlName, "utf8");
    var dividerPos = data.indexOf("\n---\n");

    var item = yaml.safeLoad(data.substr(0, dividerPos));
    item.description = marked(data.substr(dividerPos + 6));
    return item;
};

var generateIndex = function(metaData, fileName, item, indexArray){
    var reducedItem = {};

    for (var i=0; i < metaData.length; i++) {
        if (item.hasOwnProperty(metaData[i])) {
            reducedItem[metaData[i]] = item[metaData[i]];
        }
    }

    reducedItem.slug = fileName;
    
    indexArray.push(reducedItem);
};

module.exports = Md2Json;
