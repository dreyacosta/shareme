exports.init = function(app) {
  var templates = app.templates,
      socket    = app.socket,
      Backbone  = app.imports.Backbone;

  return Backbone.View.extend({
    className: 'border solid bottom_small',

    events: {
      'click input'     : 'linkSelect',
      'click .saveFile' : 'saveFile'
    },

    initialize: function() {
      this.listenTo(this.collection, 'add', this.render);
    },

    render: function() {
      var self = this;

      self.el.innerHTML = '';

      this.collection.forEach(function(model) {
        var fileModel, fileView, filesRegion;

        fileView = new app.views.File({
          model: model
        });

        app.utils.prepend({
          el: self.el,
          render: fileView.render().el
        });
      });

      return this;
    }
  });
};