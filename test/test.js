
/**
 * Test dependencies
 */

var should = require('should');
var util = require('util');
var packages = require('../lib');
var exec = require('child_process').exec;

describe('package list', function () {
  it('should return the list of installed pkgs', function(done) {
    packages(function(err, pkgs) {
      pkgs.should.eql({ 'mocha': '1.21.1', 'npm': '1.4.21', 'debug': '1.0.4' });

      done();
    });
  });

  it('should return the list of installed pkgs under different cwd', function(done) {
    this.timeout(15000);

    var cwd = './test/fixtures/app1';

    exec('npm install', { cwd: cwd }, function(err, stdout, stderr) {
      if (err) throw err;

      exec('../../../bin/cli.js', { cwd: cwd }, function(err, stdout, stderr) {
        var pkgs = JSON.parse(stdout);

        pkgs.should.eql({ 'foo': '1.0.0', 'tap': '0.4.12' });

        done();
      });
    });
  });

  it('should include missing pkgs', function(done) {
    this.timeout(10000);

    var cwd = './test/fixtures/app2';

    exec('npm install', { cwd: cwd }, function(err, stdout, stderr) {
      if (err) throw err;

      exec('npm uninstall foo', { cwd: cwd }, function(err, stdout, stderr) {
        exec('../../../bin/cli.js', { cwd: cwd }, function(err, stdout, stderr) {
          var pkgs = JSON.parse(stdout);

          pkgs.should.eql({ 'foo': '(missing)' });

          done();
        });
      });
    });
  });

  it('should include extraneous pkgs', function(done) {
    this.timeout(15000);

    var cwd = './test/fixtures/app3';

    exec('npm install dots@0.0.1', { cwd: cwd }, function(err, stdout, stderr){
      if (err) throw err;

      exec('../../../bin/cli.js', { cwd: cwd }, function(err, stdout, stderr) {
        if (err) throw err;

        var pkgs = JSON.parse(stdout);
        pkgs.should.eql({ 'dots': '0.0.1 (extraneous)' });

        done();
      });
    });
  });
});
