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

exports.compile_templates_hydra = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  bower: function ( test ) {
    test.expect(4);
    var actual = JSON.parse(grunt.file.read('bower.json'));
    var expected = JSON.parse(grunt.file.read('test/expected/bower.json'));

    test.equal(actual.name, expected.name, 'should return "hydrajs"');
    test.equal(actual.version, expected.version, 'should return "3.9.8"');
    test.equal(actual.repository.type, expected.repository.type, 'should return "git"');
    test.equal(actual.repository.url, expected.repository.url, 'should return "git://github.com/HydraJS/HydraJS.git"');

    test.done();
  },
  component: function ( test ) {
    test.expect(7);
    var actual = JSON.parse(grunt.file.read('component.json'));
    var expected = JSON.parse(grunt.file.read('test/expected/component.json'));

    test.equal(actual.name, expected.name, 'should return "hydrajs"');
    test.equal(actual.repo, expected.repo, 'should return "HydraJS/HydraJS.git"');
    test.equal(actual.description, expected.description, 'should return "Framework that gives you the tools to write your application using modules or widgets and make easy to work with them."');
    test.equal(actual.version, expected.version, 'should return "3.9.8"');
    test.equal(actual.scripts.length, expected.scripts.length, 'should return "1"');
    test.equal(actual.scripts[0], expected.scripts[0], 'should return "versions/hydra.min.js"');
    test.equal(actual.main, expected.main, 'should return "versions/hydra.min.js"');

    test.done();
  },
  readme: function ( test ) {
    test.expect(2);
    var actual = grunt.file.read('README.md');
    var expected = grunt.file.read('test/expected/README.md');

    test.ok(actual.indexOf('0.02KB') !== -1, 'should return "hydra.js"');
    test.ok(actual.indexOf('3.9.8') !== -1, 'should return "3.9.8"');

    test.done();
  }
};
