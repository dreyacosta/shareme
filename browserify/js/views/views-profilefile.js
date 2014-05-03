exports.init = function(app) {
  var templates = app.templates,
      socket    = app.socket,
      Backbone  = app.imports.Backbone;

  return Backbone.View.extend({
    template: templates.profileFile,

    className: 'border solid bottom_small',

    events: {
      'click input'     : 'linkSelect',
      'click .saveFile' : 'saveFile'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'progress', this.progress);
    },

    render: function() {
      this.el.innerHTML = this.template({
        model: this.model.toJSON()
      });
      return this;
    }
  });
};