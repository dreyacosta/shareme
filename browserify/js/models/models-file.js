exports.init = function(app) {
  var _        = app.imports._,
      $        = app.imports.$,
      Backbone = app.imports.Backbone;

  app.active.fileModels = [];

  return Backbone.Model.extend({
    url: app.config.api.file,

    defaults: {
      type         : '',
      username     : '',
      name         : '',
      size         : '',
      path         : '',
      clicks       : 0,
      registerDate : new Date()
    },

    initialize: function() {
      app.active.fileModels.push(this);
    },

    sync: function(method, model, options) {
      var progress = function(e) {
        model.trigger('progress', e);
      };

      if (method === 'create') {
        var formData = new window.FormData();

        _.each(model.attributes, function(value, key){
          formData.append(key, value);
        });

        _.defaults(options || (options = {}), {
          data: formData,
          processData: false,
          contentType: false,
          xhr: function() {
            var xhr = $.ajaxSettings.xhr();

            if (xhr instanceof window.XMLHttpRequest) {
              xhr.addEventListener('progress', progress, false);
            }

            if(xhr.upload) {
              xhr.upload.addEventListener('progress', progress, false);
            }

            return xhr;
          }
        });
      }

      return Backbone.sync.call(this, method, model, options);
    }
  });
};