'use strict';

exports.init = function(app) {
  var _        = app.imports._,
      $        = app.imports.$,
      Backbone = app.imports.Backbone;

  app.active.roomModels = [];

  return Backbone.Model.extend({
    url: app.config.api.room,

    defaults: {
      room          : '',
      connections   : 0,
      timeRemaining : '90:00',
      creationDate  : new Date()
    },

    initialize: function() {
      app.active.roomModels.push(this);
    }
  });
};