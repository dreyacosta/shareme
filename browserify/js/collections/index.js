exports.init = function(app) {
  var collections = {};

  collections.Files = require('./collections-files').init(app);

  return collections;
};