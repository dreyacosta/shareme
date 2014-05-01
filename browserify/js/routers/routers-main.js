exports.init = function(app) {
  var socket    = app.socket,
      Backbone  = app.imports.Backbone;

  return Backbone.Router.extend({
    routes: {
      ''                  : 'homePage',
      ':room'             : 'roomPage',
      'profile/:username' : 'profilePage'
    },

    initialize: function() {
      window.debug = app;

      app.room = new app.models.Room();
      app.files = new app.collections.Files();
    },

    clean: function() {
      app.active.fileModels = app.utils.cleanModels(app.active.fileModels);

      if (app.uploadView) {
        app.socket.emit('room', {room: ''});
        app.uploadView.remove();
      }
    },

    homePage: function() {
      this.clean();

      app.active.roomModels = app.utils.cleanModels(app.active.roomModels);

      app.room = new app.models.Room();

      app.menuView = new app.views.Menu({
        model : app.room
      });

      app.utils.prepend({
        el     : app.regions.menu,
        render : app.menuView.render().el
      });

      app.uploadView = new app.views.ConnectRoom({
        model : app.room
      });

      app.utils.prepend({
        el     : app.regions.upload,
        render : app.uploadView.render().el
      });
    },

    roomPage: function(room) {
      this.clean();

      app.socket.emit('room', {room: room});
      app.socket.emit('files', {room: room});

      app.uploadView = new app.views.InfoRoom({
        model : app.room
      });

      app.utils.prepend({
        el     : app.regions.upload,
        render : app.uploadView.render().el
      });

      app.filesView = new app.views.Files({
        modelView: app.views.File,
        collection: app.files
      });

      var filesRegion = app.regions.files;

      app.utils.prepend({
        el: filesRegion,
        render: app.filesView.el
      });
    }
  });
};