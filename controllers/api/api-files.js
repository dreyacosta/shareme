exports.init = function(noderplate) {
  var files = {};

  files.upload = function(req, res) {
    var file, room, options, checkFileExists,
        analytics,clientIp, moveFile, saveToDb;

    file     = req.files;
    room     = req.body.room;
    clientIp = req.headers['x-forwarded-for'] ||
               req.connection.remoteAddress ||
               req.socket.remoteAddress ||
               req.connection.socket.remoteAddress;

    checkFileExists = req.core.data.checkFileExists;
    moveFile        = req.core.data.moveFile;
    saveToDb        = req.core.data.saveToDb;

    options = {
      filename : file.files.name.replace(/\s/g, ''),
      name     : file.files.name,
      path     : '',
      size     : file.files.size,
      room     : room,
      type     : file.files.type,
      tmpPath  : file.files.path
    };

    req.core.rooms.get({room: options.room})
    .then(function(roomData) {
      return req.core.data.createDirectory('./files/');
    })
    .then(function() {
      return req.core.data.createDirectory('./files/' + options.room);
    })
    .then(function() {
      options.path = './files/' + options.room + '/' + options.filename;
      return checkFileExists(options.path);
    })
    .then(function(exists) {
      if (exists) {
        options.filename = Math.floor(Math.random() * 1000) + options.filename;
        options.path     = './files/' + options.room + '/' + options.filename;
      }
      return moveFile(options.tmpPath, options.path);
    })
    .then(function() {
      analytics            = options;
      analytics.clientData    = {
        'accept-language': req.headers['accept-language'],
        'accept-encoding': req.headers['accept-encoding'],
        'referer'        : req.headers['referer'],
        'user-agent'     : req.headers['user-agent'],
        'origin'         : req.headers['origin'],
        'accept'         : req.headers['accept'],
        'content-length' : req.headers['content-length'],
        'host'           : req.headers['host'],
        'remote-ip'      : clientIp
      };

      saveToDb('Analytic', analytics);

      return res.jsonp(saveToDb('File', options));
    })
    .fail(function(err) {
      return res.jsonp(err);
    });
  };

  return files;
};