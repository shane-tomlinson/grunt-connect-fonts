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

exports.connect_fonts = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  css_written: function(test) {
    test.expect(2);

    var actualDE = grunt.file.read('tmp/css/de.css');
    var expectedDE = grunt.file.read('test/expected/de.css');
    test.equal(actualDE, expectedDE, 'German fonts are created');

    var actualEN = grunt.file.read('tmp/css/en.css');
    var actualEN = grunt.file.read('test/expected/en.css');
    test.equal(actualDE, expectedDE, 'English fonts are created');

    test.done();
  },
  fonts_copied: function(test) {
    test.expect(4);

    test.ok(grunt.file.exists('tmp/fonts/default/firasans-light.woff'));
    test.ok(grunt.file.exists('tmp/fonts/default/firasans-regular.woff'));

    test.ok(grunt.file.exists('tmp/fonts/latin/firasans-light.woff'));
    test.ok(grunt.file.exists('tmp/fonts/latin/firasans-regular.woff'));

    test.done();
  },
};
