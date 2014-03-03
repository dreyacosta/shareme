exports.init = function(noderplate) {
  var models    = {},
      mongoose  = noderplate.imports.mongoose;

  var database = 'mongodb://' + noderplate.config.mongodb.host + '/' +
                  noderplate.config.mongodb.database;

  mongoose.connect(database, function(err) {
    if (err) { throw err; }
  });

  models.User     = require('./models-user').init(noderplate);
  models.File     = require('./models-file').init(noderplate);
  models.Room     = require('./models-rooms').init(noderplate);
  models.Analytic = require('./models-analytic').init(noderplate);

  return models;
};