'use strict';

var expect     = require('chai').expect,
    noderplate = require('../../noderplate');

var core = noderplate.app.core;

describe('Core', function(){
  describe("Filesystem", function() {
    var mockPath = __dirname + '/testdir/';

    it('should create directory', function(done) {
      core.filesystem.mkdir(mockPath)
      .then(function() {
        done();
      });
    });

    it('should exist directory', function(done) {
      core.filesystem.exists(mockPath).then(function(exists) {
        expect(exists).to.equal(true);
        done();
      }).fail(function(err) {
        done(err);
      });
    });

    it('should rename directory', function(done) {
      var mockNewPath = __dirname + '/testdirMove/';

      core.filesystem.rename(mockPath, mockNewPath).then(function() {
        mockPath = mockNewPath;
        done();
      }).fail(function(err) {
        done(err);
      });
    });

    it('should remove directory', function(done) {
      core.filesystem.rmdir(mockPath)
      .then(function() {
        done();
      })
      .fail(function(err) {
        done(err);
      });
    });

    it('should not exist directory', function(done) {
      core.filesystem.exists(mockPath).then(function(exists) {
        expect(exists).to.equal(false);
        done();
      }).fail(function(err) {
        done(err);
      });
    });
  });

  describe("Data", function() {
    it('should save model to database', function() {
      var res = core.data.save('File', {
        filename: 'Hello World',
        size: 23821,
        room: 'Demo'
      });

      expect(res.filename).to.equal('Hello World');
      expect(res.size).to.equal('23821');
    });

    it('should retrieve files from a room', function(done) {
      core.data.query('File', 'find', {room: 'Demo'}).then(function(files) {
        expect(files.length).to.equal(1);
        done();
      }).fail(function(err) {
        done(err);
      });
    });

    it('should remove files from a room', function(done) {
      core.data.query('File', 'remove', {room: 'Demo'}).then(function(removeEls) {
        expect(removeEls).to.equal(1);
        done();
      }).fail(function(err) {
        done(err);
      });
    });
  });
});