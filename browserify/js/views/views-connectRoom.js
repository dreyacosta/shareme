'use strict';

exports.init = function(app) {
  var templates = app.templates,
      regions   = app.regions,
      models    = app.models,
      socket    = app.socket,
      utils     = app.utils,
      active    = app.active,
      Backbone  = app.imports.Backbone;

  return utils.BaseView.extend({
    template: templates.connectRoom,

    className: 'anchor \
                bck b_stimulation \
                border solid bottom_small',

    events: {
      'click .connectRoom' : 'connectRoom',
      'keyup input'        : 'connectRoom',
      'click input'        : 'connectRoom'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(app.room, 'change', this.triggerRoute);
    },

    connectRoom: function(e) {
      var room = e.currentTarget.value || this.el.querySelector('input').value;
      app.socket.emit('room', {room: room});

    },

    triggerRoute: function() {
      if (app.room.get('room')) {
        app.active.mainRouter.navigate(app.room.get('room'), { trigger: true });
      }
    }
  });
};