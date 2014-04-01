exports.init = function(noderplate) {
  var files = {};

  files.upload = function(req, res) {
    var roomFilesPath, mkdir, exists, rename, query, save, file, filepath;

    roomFilesPath = noderplate.config.roomFilesPath;

    mkdir  = req.core.filesystem.mkdir;
    exists = req.core.filesystem.exists;
    rename = req.core.filesystem.rename;
    query  = req.core.data.query;
    save   = req.core.data.save;

    file = {
      filename : req.files.files.name.replace(/\s|%/g, '-'),
      name     : req.files.files.name,
      size     : req.files.files.size,
      room     : req.body.room,
      type     : req.files.files.type,
      tmpPath  : req.files.files.path
    };

    query('Room', 'findOne', {room: file.room})
    .then(function(room) {
      filepath = roomFilesPath;

      return mkdir(filepath);
    })
    .then(function() {
      filepath = roomFilesPath + file.room;

      return mkdir(filepath);
    })
    .then(function() {
      filepath = roomFilesPath + file.room + '/' + file.filename;

      return exists(filepath);
    })
    .then(function(exists) {
      if (exists) {
        file.filename = Math.floor(Math.random() * 1000) + file.filename;
        filepath      = roomFilesPath + file.room + '/' + file.filename;
      }

      return rename(file.tmpPath, filepath);
    })
    .then(function() {
      return res.jsonp(save('File', file));
    })
    .fail(function(err) {
      return res.jsonp(err);
    });
  };

  return files;
};