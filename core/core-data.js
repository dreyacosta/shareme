'use strict';

exports.init = function(noderplate) {
  var data  = {},
      File  = noderplate.app.models.File,
      Q     = noderplate.imports.Q,
      fs    = noderplate.imports.fs;

  data.save = function(model, options) {
    var Model = noderplate.app.models[model];

    model = new Model(options);
    model.save();

    return model;
  };

  data.query = function(model, type, query) {
    var dfd = Q.defer(),
        Model = noderplate.app.models[model];

    Model[type](query, function(err, data) {
      if (err) {
        return dfd.reject(err);
      }

      if (!data) {
        return dfd.resolve(null);
      }

      return dfd.resolve(data);
    });

    return dfd.promise;
  };

  return data;
};