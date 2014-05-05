'use strict';

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
      this.listenTo(this.model, 'change:room', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    createRoom: function() {
      var self = this;

      this.model.save({}, {
        success: function(model) {
          self.model = model;

          app.active.mainRouter.navigate(self.model.get('room'), { trigger: true});
        }
      });
    },

    disconnectRoom: function() {
      app.active.mainRouter.navigate('', { trigger: true });
    },

    render: function() {
      this.el.innerHTML = this.template({});

      this.el.querySelector('.createRoom').classList.remove('hidden');
      this.el.querySelector('.disconnectRoom').classList.add('hidden');

      if (this.model.get('room') !== '') {
        this.el.querySelector('.createRoom').classList.add('hidden');
        this.el.querySelector('.disconnectRoom').classList.remove('hidden');
      }

      return this;
    }
  });
};