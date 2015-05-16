var brocWriter = require('broccoli-writer');

var Md2Json = function Md2Json(inTree,options) {
    if (!(this instanceof Md2Json)) {
        return new Md2Json(inTree, options);
    }

    this.inTree = inTree;
    this.options = options || {};

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
  });
};


modules.exports = Md2Json;
