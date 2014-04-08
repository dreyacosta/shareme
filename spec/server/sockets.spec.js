var expect     = require('chai').expect,
    should     = require('chai').should(),
    request    = require('supertest'),
    io         = require('socket.io-client'),
    noderplate = require('../../noderplate');

require('../../app');

var core   = noderplate.app.core,
    config = noderplate.config;

describe("Sockets", function() {
  var room;

  describe("Prepare", function() {
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

    it("should upload a file", function(done) {
      var post = {
        files: {
          files: {
            name: 'Hello',
            size: 124123,
            type: 'image/jpg',
            path: 'var/tmp/file.jpg'
          }
        },
      };

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

  describe("Testing sockets", function() {
    var socket;

    beforeEach(function(done) {
      noderplate.io.set('log level', 1);
      socket = io.connect('http://localhost:3000', {
        'force new connection' : true
      });

      socket.on('connect', function() {
        done();
      });
    });

    afterEach(function(done) {
      if(socket.socket.connected) {
        socket.disconnect();
      }
      done();
    });

    it("should return room data", function(done) {
      socket.emit('room', room);
      socket.emit('file:create', {title: 'Foo'});

      socket.on('file:create', function(data) {
        expect(data.room).to.equal(room);
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