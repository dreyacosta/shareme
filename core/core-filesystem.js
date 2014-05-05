'use strict';

exports.init = function(noderplate) {
  var filesystem = {},
      Q          = noderplate.imports.Q,
      fs         = noderplate.imports.fs;

  filesystem.mkdir = function(path) {
    var dfd = Q.defer();

    fs.mkdir(path, function() {
      return dfd.resolve();
    });

    return dfd.promise;
  };

  filesystem.rmdir = function(path) {
    var dfd = Q.defer();

    fs.rmdir(path, function(err) {
      if (err) {
        return dfd.reject(err);
      }

      return dfd.resolve();
    });

    return dfd.promise;
  };

  filesystem.exists = function(path) {
    var dfd = Q.defer();

    fs.exists(path, function(exists) {
      return dfd.resolve(exists);
    });

    return dfd.promise;
  };

  filesystem.copy = function(target, source) {
    fs.writeFileSync(target, fs.readFileSync(source));
  };

  filesystem.rename = function(originalPath, newPath) {
    var dfd = Q.defer();

    fs.rename(originalPath, newPath, function(err) {
      if (err) {
        return dfd.reject(err);
      }

      return dfd.resolve();
    });

    return dfd.promise;
  };

  filesystem.deletefile = function(path) {
    var dfd = Q.defer();

    fs.unlink(path, function(err) {
      if (err) {
        return dfd.reject(err);
      }

      return dfd.resolve();
    });

    return dfd.promise;
  };

  return filesystem;
};