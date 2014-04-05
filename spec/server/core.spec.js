var expect     = require('chai').expect,
    noderplate = require('../../noderplate');

describe('Core filesystem', function(){
  var core = noderplate.app.core;
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