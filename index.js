var brocWriter = require('broccoli-writer');
var brocFilter = require('broccoli-filter');
var brocHelpers = require("broccoli-kitchen-sink-helpers");
var glob = require('glob');


var Md2Json = function Md2Json(inTree,options) {
    if (!(this instanceof Md2Json)) {
        return new Md2Json(inTree, options);
    }

    this.inTree = inTree;
    this.options = options || {};

    // this.outputFile = "fc2.json";
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            this[key] = options[key];
            console.log(this[key]);
        }
    }

    // options should be: input tree path, output tree path at minimum
};

Md2Json.prototype = Object.create(brocWriter.prototype);

Md2Json.prototype.constructor = Md2Json;

Md2Json.prototype.description = 'test-plugin';

Md2Json.prototype.write = function(readTree, destDir) {
    var self = this;

    return readTree(this.inTree).then(function (srcDir) {

    /* use srcDir and information from self.options to figure out which files to read from */
    /* use destDir and information from self.options to figure outwhich files to write to */
    /* synchronously read input files, do some processing, and write output files */
    

        // find all files matching inputFiles option (**/*) in inputTree directory (srcDir = ./data in our example).
        var inputFiles = brocHelpers.multiGlob(self.inputFiles, { cwd: srcDir });
        // inputFiles is an array with the names of the files found, with extension.
        
    // get name of files

    // rename name of files

    // write files
  });
};


module.exports = Md2Json;
