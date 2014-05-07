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
  default_options: function(test) {
    test.expect(2);

    var actualDE = grunt.file.read('tmp/default_options/de/fonts.css');
    var expectedDE = grunt.file.read('test/expected/default_options/de/fonts.css');
    test.equal(actualDE, expectedDE, 'German fonts are created');

    var actualEN = grunt.file.read('tmp/default_options/en/fonts.css');
    var actualEN = grunt.file.read('test/expected/default_options/en/fonts.css');
    test.equal(actualDE, expectedDE, 'English fonts are created');

    test.done();
  },
};
