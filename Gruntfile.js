/*
 * grunt-connect-fonts
 * https://github.com/stomlinson/grunt-connect-fonts
 *
 * Copyright (c) 2014 Shane Tomlinson
 * Licensed under the MPL2.0 license.
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
    connect_fonts: {
      dist: {
        options: {
          fontPacks: ['connect-fonts-firasans'],
          fontNames: ['firasans-regular', 'firasans-light'],
          languages: ['en', 'de']
        }
      }
    },

    connect_fonts_copy: {
      dist: {
        options: {
          fontPacks: ['connect-fonts-firasans']
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
  grunt.registerTask('test', ['clean', 'connect_fonts', 'connect_fonts_copy', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
