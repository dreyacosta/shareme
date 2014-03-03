var expect     = require('chai').expect,
    noderplate = require('../../noderplate');

describe('Noderplate core files', function(){
  var core = noderplate.app.core;

  it('should create directory', function(done) {
    core.data.createDirectory('testdir')
    .then(function() {
      done();
    });
  });

  it('should remove directory', function(done) {
    core.data.removeDirectory('testdir')
    .then(function() {
      done();
    })
    .fail(function(err) {
      done(err);
    });
  });

  it('should save model to database', function() {
    var res = core.data.saveToDb('File', {
      filename: 'Hello World',
      size: 23821,
      room: 'Demo'
    });

    expect(res.filename).to.equal('Hello World');
    expect(res.size).to.equal('23821');
  });

  it('should retrieve files from a room', function(done) {
    core.files.getUserFiles({room: 'Demo'})
    .then(function(files) {
      expect(files.length).to.equal(1);
      done();
    })
    .fail(function(err) {
      done(err);
    });
  });

  it('should retrieve one expecific file', function(done) {
    core.files.getFile({room: 'Demo', filename: 'Hello World'})
    .then(function(file) {
      expect(file.room).to.equal('Demo');
      expect(file.size).to.equal('23821');
      done();
    })
    .fail(function(err) {
      done(err);
    });
  });

  it('should remove files from a room', function(done) {
    core.files.removeRoomFiles({room: 'Demo'})
    .then(function(removeEls) {
      expect(removeEls).to.equal(1);
      done();
    })
    .fail(function(err) {
      done(err);
    });
  });

  // it('should send an email', function(done) {
  //   var mailOptions = {
  //     from    : 'shareme.io',
  //     to      : 'david.rey.acosta@gmail.com',
  //     subject : 'Hello ✔',
  //     html    : '<b>Hello world ✔</b>'
  //   };

  //   noderplate.app.core.sendmail.send(mailOptions)
  //   .then(function(res) {
  //     expect(res).to.equal('Message sent');
  //     done();
  //   })
  //   .fail(function(err) {
  //     done(err);
  //   });
  // });

  // it('should insert in the database', function(done) {
  //   var options = {
  //     files : {
  //       name    : 'Hello World',
  //       type    : 'image/jpeg',
  //       size    : 201412,
  //       tmpPath : '/tmp/path'
  //     },
  //     username : 'testingmongo'
  //   };

  //   core.files.saveFile(options)
  //   .then(function(file) {
  //     expect(file.name).to.equal('aaa');
  //     done();
  //   })
  //   .fail(function(err) {
  //     done(err);
  //   });
  // });

  // it('mongdb', function(){
  //   var options, file;

  //   options = {
  //     username : '7RBDx'
  //   };

  //   file = core.files.saveToDb('File', options);

  //   expect(file.username).to.equal('7RBDx');
  //   expect(noderplate.app.env).to.equal('simplemocha');
  // });
});