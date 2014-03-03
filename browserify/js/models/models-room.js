exports.init = function(app) {
  var _        = app.imports._,
      $        = app.imports.$,
      Backbone = app.imports.Backbone;

  return Backbone.Model.extend({
    url: '/api/create/room',

    defaults: {
      room          : '',
      connections   : 0,
      timeRemaining : '30:00',
      creationDate  : new Date()
    },
  });
};