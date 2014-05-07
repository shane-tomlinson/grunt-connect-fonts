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
      dest: 'tmp'
    });

    var fontPacks = loadFontPacks(options.fontPacks);
    var languages = [].concat(options.languages);

    connectFonts.setup({
      fonts: fontPacks,
      'allow-origin': '*' // connect-fonts requires this even though
                          // it is not serving the fonts.
    });

    processNextLanguage();
    function processNextLanguage() {
      var language = languages.shift();
      if (! language) {
        return done();
      }

      connectFonts.generate_css(options.userAgent, language, options.fontNames, function (err, css) {
        if (err) {
          return done(err);
        }

        var destPath = getDestPath(options, language);
        grunt.log.writeln('writing to: ', destPath);
        grunt.file.write(destPath, css.css);
        processNextLanguage(languages, done);
      });
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

  function getDestPath(options, language) {
    var destPath = options.dest + '/' + language + '/fonts.css';
    return destPath;
  }
};
