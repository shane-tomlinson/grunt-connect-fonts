'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

function lineCompare(expected, actual, test, message) {
  expected = expected.split('\n');
  actual = actual.split('\n');

  actual.forEach(function(actual, index) {
    test.equal(actual, expected[index], message);
  });

}

exports.connect_fonts = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  css_written: function(test) {
    test.expect(60);

    var actualDE = grunt.file.read('tmp/css/de.css');
    var expectedDE = grunt.file.read('test/expected/de.css');
    lineCompare(expectedDE, actualDE, test, 'German');

    var actualEN = grunt.file.read('tmp/css/en.css');
    var expectedEN = grunt.file.read('test/expected/en.css');
    lineCompare(expectedEN, actualEN, test, 'English');

    test.done();
  },
  css_written_custom_filename: function(test) {
    test.expect(60);

    var actualDE = grunt.file.read('tmp/custom_css_filename/de/fonts.css');
    var expectedDE = grunt.file.read('test/expected/de.css');
    lineCompare(expectedDE, actualDE, test, 'German');

    var actualEN = grunt.file.read('tmp/custom_css_filename/en/fonts.css');
    var expectedEN = grunt.file.read('test/expected/en.css');
    lineCompare(expectedEN, actualEN, test, 'English');

    test.done();
  },
  fonts_copied: function(test) {
    test.expect(8);

    test.ok(grunt.file.exists('tmp/fonts/default/firasans-light.woff'));
    test.ok(grunt.file.exists('tmp/fonts/default/firasans-regular.woff'));

    test.ok(grunt.file.exists('tmp/fonts/default/firasans-light.woff2'));
    test.ok(grunt.file.exists('tmp/fonts/default/firasans-regular.woff2'));

    test.ok(grunt.file.exists('tmp/fonts/latin/firasans-light.woff'));
    test.ok(grunt.file.exists('tmp/fonts/latin/firasans-regular.woff'));

    test.ok(grunt.file.exists('tmp/fonts/latin/firasans-light.woff2'));
    test.ok(grunt.file.exists('tmp/fonts/latin/firasans-regular.woff2'));

    test.done();
  },
};
