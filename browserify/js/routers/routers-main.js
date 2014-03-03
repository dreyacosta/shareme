exports.init = function(app) {
  var socket    = app.socket,
      Backbone  = app.imports.Backbone;

  var roomModel, uploadView, menuView;

  app.active.roomModels = [];

  return Backbone.Router.extend({
    routes: {
      ''      : 'homePage',
      ':room' : 'roomPage'
    },

    initialize: function() {
      window.debug = app;

      roomModel = new app.models.Room();

      app.active.roomModels.push(roomModel);

      uploadView = new app.views.Upload({
        model : roomModel
      });

      app.utils.prepend({
        el     : app.regions.upload,
        render : uploadView.render().el
      });

      menuView = new app.views.Menu({
        model : roomModel
      });

      app.utils.prepend({
        el     : app.regions.menu,
        render : menuView.render().el
      });
    },

    homePage: function() {
      app.active.fileModels = app.utils.cleanModels(app.active.fileModels);
      roomModel.set({
        room: ''
      });
      app.socket.emit('room', '');
    },

    roomPage: function(room) {
      app.socket.emit('room', room);
    }
  });
};