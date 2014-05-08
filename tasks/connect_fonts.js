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
      dest: 'tmp/css'
    });

    var fontPacks = loadFontPacks(options.fontPacks);
    var languages = [].concat(options.languages);

    var fontMiddleware = connectFonts.setup({
      fonts: fontPacks
    });

    processNextLanguage();
    function processNextLanguage() {
      var language = languages.shift();
      if (! language) {
        return done();
      }

      fontMiddleware.generate_css(options.userAgent, language, options.fontNames, function (err, css) {
        if (err) return done(err);

        var destPath = getCssDestPath(options, language);

        grunt.log.writeln('writing to: ', destPath);

        grunt.file.write(destPath, css.css);
        processNextLanguage(languages, done);
      });
    }
  });

  grunt.registerMultiTask('connect_fonts_copy', 'Copy web font files from npm packages to a destination.', function () {
    var done = this.async();

    var options = this.options({
      fontPacks: [],
      dest: 'tmp/fonts'
    });

    var destRoot = options.dest + '/';

    var fontPacks = loadFontPacks(options.fontPacks);

    var fontMiddleware = connectFonts.setup({
      fonts: fontPacks
    });

    var urlToFontPaths = fontMiddleware.urlToPaths;
    var urls = Object.keys(urlToFontPaths);

    copyNextFont();
    function copyNextFont() {
      var url = urls.shift();
      if (! url) return done();

      var srcPath = urlToFontPaths[url];
      var destPath = url.replace(/^\/fonts\//, destRoot);

      grunt.log.writeln('copying `%s` to `%s`', srcPath, destPath);

      grunt.file.copy(srcPath, destPath);
      copyNextFont();
    }
  });

  function loadFontPacks(fontPacks) {
    return fontPacks.map(function (fontPack) {
      if (typeof fontPack === 'string') {
        return require(fontPack);
      }
      return fontPack;
    });
  }

  function getCssDestPath(options, language) {
    var destPath = options.dest + '/' + language + '.css';
    return destPath;
  }
};
