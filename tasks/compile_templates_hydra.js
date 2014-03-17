module.exports = function (grunt) {
  'use strict';
  var async = require('async');
  var swig = require('swig');
  var fs = require('fs');
  var path = require('path');
  var writeTemplate = function(sDest, sContents, callback) {
    fs.writeFile(sDest, sContents, callback);
  };
  var getFilePath = function ( sBase, sFilePath ){
    return path.join( sBase || process.cwd(), sFilePath || '');
  };
  grunt.registerMultiTask('compile_templates_hydra', 'Compile all the templates with the updated info', function () {
    var done = this.async();
    var options = this.options();
    var sBase = options.base;
    var sFile = options.file;
    var sFilePath = getFilePath( sBase, sFile);
    var oVariables = options.variables;
    async.map(this.files, function (file, callback) {
      var sDest, oTemplate;
      sDest = getFilePath( sBase, file.dest );
      oTemplate = file.src.filter(function( filepath ) {
        filepath = getFilePath( sBase, filepath);
        if(!grunt.file.exists( filepath )) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }else{
          return true;
        }
      }).map(function ( filepath ) {
        filepath = getFilePath( sBase, filepath);
        return swig.compileFile(filepath);
      })[0];

      if(sFile && grunt.file.exists(sFilePath)){
        fs.stat(sFilePath, function (err, stats) {
          oVariables.size = (stats.size / 1024).toFixed(2);
          writeTemplate(sDest, oTemplate(oVariables), callback);
        });
      }else{
        writeTemplate(sDest, oTemplate(oVariables), callback);
      }
    }, function (err, results) {
      done();
    });
  });
};