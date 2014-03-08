module.exports = function (grunt) {
  'use strict';
  var async = require('async');
  var swig = require('swig');
  var fs = require('fs');
  var path = require('path');

  grunt.registerMultiTask('compile_templates_hydra', 'Compile all the templates with the updated info', function () {
    var done = this.async();
    var config = this.data;
    var sFile = config.file;
    var sFolder = config.templates.folder;
    var oVariables = config.variables;
    async.map(config.templates.files, function (oTPL, callback) {
      var oTemplate = swig.compileFile(path.join(config.base, sFolder, oTPL.src));
      fs.stat(sFile, function (err, stats) {
        oVariables.size = (stats.size / 1024).toFixed(2);
        fs.writeFile(path.join(config.base, oTPL.dest), oTemplate(oVariables), function () {
          callback();
        });
      });
    }, function (err, results) {
      done();
    });
  });
};