/*
 * grunt-connect-fonts
 * https://github.com/stomlinson/grunt-connect-fonts
 *
 * Copyright (c) 2014 Shane Tomlinson
 * Licensed under the MPL2.0 license.
 */

'use strict';

var connectFonts = require('connect-fonts');

module.exports = function (grunt) {

  grunt.registerMultiTask('connect_fonts', 'Generate CSS files for connect-fonts compatible font packs.', function () {
    var done = this.async();

    var options = this.options({
      fontPacks: [],
      fontNames: [],
      languages: [],
      userAgent: 'all',
      dest: 'tmp/css',
      destFileName: getCssDestPath
    });

    options.dest = ensureTrailingSlash(options.dest);

    // create new arrays so that the original arrays are not modified.
    options.fontPacks = [].concat(options.fontPacks);
    options.fontNames = [].concat(options.fontNames);
    options.languages = [].concat(options.languages);

    var fontMiddleware = connectFonts.setup({
      fonts: loadFontPacks(options.fontPacks)
    });

    generateCss(fontMiddleware, options, done);
  });

  function getCssDestPath(root, language) {
    var destPath = root + language + '.css';
    return destPath;
  }

  function ensureTrailingSlash(dest) {
    if (! /\/$/.test(dest)) {
      dest += '/';
    }
    return dest;
  }

  // Recursively generate the CSS files, one file per language.
  function generateCss(fontMiddleware, options, done) {
    var language = options.languages.shift();
    if (! language) {
      return done();
    }

    fontMiddleware.generate_css(options.userAgent, language, options.fontNames, function (err, css) {
      if (err) {
        return done(err);
      }

      var destPath = options.destFileName(options.dest, language);

      grunt.log.writeln('writing to: ', destPath);

      grunt.file.write(destPath, css.css);
      generateCss(fontMiddleware, options, done);
    });
  }

  grunt.registerMultiTask('connect_fonts_copy', 'Copy web font files from npm packages to a destination.', function () {
    var done = this.async();

    var options = this.options({
      fontPacks: [],
      dest: 'tmp/fonts'
    });

    var fontMiddleware = connectFonts.setup({
      fonts: loadFontPacks(options.fontPacks)
    });

    var destRoot = options.dest + '/';
    var files = toFiles(fontMiddleware.urlToPaths, destRoot);

    copyFiles(files);
    done();
  });

  function loadFontPacks(fontPacks) {
    return fontPacks.map(function (fontPack) {
      if (typeof fontPack === 'string') {
        return require(fontPack);
      }
      return fontPack;
    });
  }

  function toFiles(urlToSrcPathMap, destRoot) {
    var files = [];
    for (var url in urlToSrcPathMap) {
      var srcPath = urlToSrcPathMap[url];
      // url will be of the form /fonts/{{ subset }}/{{ font_file }}.
      // Replace the /fonts with the root dest.
      var destPath = url.replace(/^\/fonts\//, destRoot);

      files.push({
        src: srcPath,
        dest: destPath
      });
    }

    return files;
  }

  function copyFiles(files) {
    files.forEach(function (file) {
      grunt.log.writeln('copying `%s` to `%s`', file.src, file.dest);

      grunt.file.copy(file.src, file.dest);
    });
  }

};
