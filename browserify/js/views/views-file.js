exports.init = function(app) {
  var templates = app.templates,
      socket    = app.socket,
      Backbone  = app.imports.Backbone;

  return Backbone.View.extend({
    template: templates.file,

    className: 'border solid bottom_small',

    events: {
      'click input': 'linkSelect'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'progress', this.progress);
    },

    selectors: function() {
      this.__downloadLink = this.el.querySelector('.downloadLink');
      this.__queueFile = this.el.querySelector('.queueFile');
      this.__anchor1 = this.el.querySelector('.anchor1');
      this.__progressBar  = this.el.querySelector('.progressBar');
    },

    linkSelect: function(e) {
      e.currentTarget.select();
    },

    progress: function(e) {
      var percentComplete = Math.round((e.loaded / e.total) * 100);

      if (this.__downloadLink) {
        this.__downloadLink.classList.add('hidden');
      }

      if (this.__queueFile) {
        this.__queueFile.classList.add('hidden');
      }

      this.__progressBar.classList.remove('hidden');
      this.__anchor1.style.background = 'rgb(247, 250, 250)';

      this.__progressBar.innerHTML = percentComplete + '%';
      this.__progressBar.style.width = percentComplete + '%';
    },

    uploadFile: function() {
      this.model.save({}, {
        success: function(model) {
          socket.emit('file:create', model);
        }
      });
    },

    render: function() {
      this.el.innerHTML = this.template({
        model: this.model.toJSON()
      });
      this.selectors();
      return this;
    }
  });
};