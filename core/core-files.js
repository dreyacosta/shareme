exports.init = function(noderplate) {
  var files = {},
      File  = noderplate.app.models.File,
      Q     = noderplate.imports.Q,
      fs    = noderplate.imports.fs;

  files.getFile = function(options) {
    var dfd = Q.defer();

    var room = options.room;
    var filename = options.filename;

    File.findOne({room: room, filename: filename}, function(err, file) {
      if (err) {
        return dfd.reject(err);
      }

      if (file) {
        return dfd.resolve(file);
      }

      return dfd.reject({ message: 'not in the db' });
    });

    return dfd.promise;
  };

  files.getFiles = function() {
    var dfd = Q.defer();

    File.count({}, function(err, files) {
      if (err) {
        return dfd.reject(err);
      }

      return dfd.resolve(files);
    });

    return dfd.promise;
  };

  files.getUserFiles = function(options) {
    var dfd = Q.defer();

    var room = options.room;

    File.find({room: room}, function(err, files) {
      if (err) {
        return dfd.reject(err);
      }

      return dfd.resolve(files);
    });

    return dfd.promise;
  };

  files.removeRoomFiles = function(options) {
    var dfd = Q.defer();

    var room = options.room;

    File.remove({room: room}, function(err, removeEls) {
      if (err) {
        return dfd.reject(err);
      }

      return dfd.resolve(removeEls);
    });

    return dfd.promise;
  };

  return files;
};