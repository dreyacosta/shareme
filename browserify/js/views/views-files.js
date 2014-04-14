exports.init = function(app) {
  var templates = app.templates,
      socket    = app.socket,
      Backbone  = app.imports.Backbone;

  return app.utils.CollectionView.extend({});
};