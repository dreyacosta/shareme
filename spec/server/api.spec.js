'use strict';

var expect     = require('chai').expect,
    should     = require('chai').should(),
    request    = require('supertest'),
    noderplate = require('../../noderplate');

var core   = noderplate.app.core,
    config = noderplate.config;

describe("API", function() {
  var room;

  describe("/api/create/room", function() {
    it("should create a room", function(done) {
      request(noderplate.app)
      .post('/api/create/room')
      .end(function(err, res) {
        if (err) {
          done(err);
        }

        room = res.body.room;

        expect(res.type).to.equal('application/json');
        res.body.should.have.property('room');
        res.body.should.have.property('creationDate');
        done();
      });
    });
  });

  describe("/api/upload/file", function() {
    it("should upload a file", function(done) {
      request(noderplate.app)
      .post('/api/upload/file')
      .field('room', room)
      .attach('files', __dirname + '/fixtures/file.jpg')
      .end(function(err, res) {
        expect(res.body.room).to.equal(room);
        res.body.should.have.property('_id');
        done();
      });
    });
  });

  describe("Cleaners", function() {
    it("should remove files and folders", function(done) {
      core.data.query('File', 'find', {room: room})
      .then(function(files) {
        if (files) {
          for (var idx in files) {
            var file = files[idx],
                path = config.roomFilesPath + file.room + '/' + file.filename;
            core.filesystem.deletefile(path);
            file.remove();
          }
        }

        return core.data.query('Room', 'remove', {room: room});
      })
      .then(function() {
        var path = config.roomFilesPath + room;
        core.filesystem.rmdir(path);
        done();
      })
      .fail(function(err) {
        done(err);
      });
    });

    it("should remove all the rooms", function(done) {
      core.data.query('Room', 'remove', {})
      .then(function() {
        done();
      })
      .fail(function(err) {
        done(err);
      });
    });
  });
});