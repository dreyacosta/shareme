exports.init = function(app) {
  var templates = app.templates,
      regions   = app.regions,
      models    = app.models,
      socket    = app.socket,
      utils     = app.utils,
      active    = app.active,
      Backbone  = app.imports.Backbone;

  return utils.BaseView.extend({
    template: templates.infoRoom,

    className: 'anchor \
                bck b_stimulation \
                border solid bottom_small',

    events: {
      'click .connectRoom' : 'connectRoom',
      'keyup input'        : 'connectRoom',
      'click input'        : 'connectRoom',
      'click .uploadFiles' : 'clickFakeInput'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this._remove);

      this.fakeInputFile = document.createElement('input');
      this.fakeInputFile.setAttribute('type', 'file');
      this.fakeInputFile.setAttribute('multiple', 'true');
      this.fakeInputFile.addEventListener('change', this.uploadFiles.bind(this));
    },

    uploadFiles: function() {
      var files, file, modelRoom, fileView;

      files     = this.fakeInputFile.files;
      modelRoom = this.model.get('room');

      if (this.model.get('room') !== '') {
        for (var i in files) {
          file = files[i];

          if (typeof file === 'object') {
            var fileModel = new app.models.File({
              files    : file,
              name     : file.name,
              size     : file.size,
              room     : modelRoom
            });

            app.files.add(fileModel);
            fileModel.save({});
          }
        }
      }
    },

    clickFakeInput: function() {
      this.fakeInputFile.files = '';
      this.fakeInputFile.click();
    },

    _remove: function() {
      this.fakeInputFile.remove();
      this.remove();
    }
  });
};