exports.init = function(app) {
  var templates = app.templates,
      socket    = app.socket,
      utils     = app.utils,
      Backbone  = app.imports.Backbone;

  return Backbone.View.extend({
    template: templates.menu,

    className: 'flex y_center \
                padding_medium',

    events: {
      'click .createRoom'     : 'createRoom',
      'click .disconnectRoom' : 'disconnectRoom'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    createRoom: function() {
      var self = this;

      this.model.save({}, {
        success: function(model) {
          self.model = model;

          socket.emit('room', self.model.get('room'));

          app.active.mainRouter.navigate(self.model.get('room'));
        }
      });
    },

    disconnectRoom: function() {
      this.model.set({
        room: ''
      });

      socket.emit('room', '');

      app.active.fileModels = utils.cleanModels(app.active.fileModels);
      app.active.mainRouter.navigate(this.model.get('room'), { trigger: true });
    },

    render: function() {
      this.el.innerHTML = this.template({});

      if (this.model.get('room') !== '') {
        this.el.querySelector('.createRoom').classList.add('hidden');
        this.el.querySelector('.disconnectRoom').classList.remove('hidden');
      }

      return this;
    }
  });
};