exports.init = function(noderplate) {
  var data  = {},
      File  = noderplate.app.models.File,
      Q     = noderplate.imports.Q,
      fs    = noderplate.imports.fs;

  data.createDirectory = function(path) {
    var dfd = Q.defer();

    fs.mkdir(path, function(e) {
      return dfd.resolve();
    });

    return dfd.promise;
  };

  data.removeDirectory = function(path) {
    var dfd = Q.defer();

    fs.rmdir(path, function(err) {
      if (err) {
        return dfd.reject(err);
      }

      return dfd.resolve();
    });

    return dfd.promise;
  };

  data.checkFileExists = function(path) {
    var newFilename, targetPath,
        dfd = Q.defer();

    fs.exists(path, function(exists) {
      return dfd.resolve(exists);
    });

    return dfd.promise;
  };

  data.moveFile = function(originalPath, newPath) {
    var dfd = Q.defer();

    fs.rename(originalPath, newPath, function(err) {
      if (err) {
        return dfd.reject(err);
      }

      return dfd.resolve();
    });

    return dfd.promise;
  };

  data.deleteFile = function(path) {
    fs.unlink(path, function(err) {

    });
  };

  data.saveToDb = function(model, options) {
    var Model = noderplate.app.models[model];

    model = new Model(options);
    model.save();

    return model;
  };

  return data;
};