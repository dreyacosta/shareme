'use strict';

exports.init = function(app) {
  var _        = app.imports._,
      $        = app.imports.$,
      Backbone = app.imports.Backbone;

  return Backbone.Collection.extend({});
};