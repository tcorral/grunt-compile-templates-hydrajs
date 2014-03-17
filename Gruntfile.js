/*
 * grunt-compile-templates-hydra
 * https://github.com/amischol/grunt-compile-templates-hydrajs
 *
 * Copyright (c) 2014 tcorral
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    compile_templates_hydra: {
      options: {
        variables: {
          version: "3.9.8",
          description: "Framework that gives you the tools to write your application using modules or widgets and make easy to work with them.",
          repository_type: "git",
          repository_url: "git://github.com/HydraJS/HydraJS.git",
          repository_shorten: "HydraJS/HydraJS.git"
        }
      },
      devel: {
        options: {
          file: 'test/fixtures/file.js'
        },
        files: {
          'test/retrieved/bower.json': 'test/fixtures/bower.tpl',
          'test/retrieved/component.json': 'test/fixtures/component.tpl',
          'test/retrieved/README.md': 'test/fixtures/README.tpl',
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'compile_templates_hydra', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
