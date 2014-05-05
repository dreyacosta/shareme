'use strict';

exports.init = function(app) {
  var utils = {};

  utils.BaseView = app.imports.Backbone.View.extend({
    constructor: function() {
      app.imports.Backbone.View.apply(this, arguments);
    },

    render: function() {
      var data, renderedHtml;

      if (this.model) {
        data = this.model.toJSON();
      }

      if (this.serializeData) {
        data = this.serializeData();
      }

      renderedHtml = this.template({
        model: data
      });

      this.el.innerHTML = renderedHtml;

      if (this.onRender) {
        this.onRender();
      }

      return this;
    }
  });

  utils.CollectionView = utils.BaseView.extend({
    constructor: function(options){
      app.utils.BaseView.apply(this, arguments);
      this.modelView = options.modelView;
      this.listenTo(this.collection, 'add', this.modelAdded);
    },

    getModelView: function(model) {
      return this.modelView;
    },

    modelAdded: function(item) {
      var view;

      view = this.renderModel(item);

      this.el.insertBefore(view.el, this.el.firstChild);
    },

    renderModel: function(item) {
      var ViewType, view;

      ViewType = this.getModelView(item);

      view = new ViewType({model: item});
      view.render();

      return view;
    },

    render: function() {
      var html = [];

      this.collection.each(function(model) {
        var view;

        view = this.renderModel(model);

        html.push(view.el);
      }, this);

      this.el.innerHTML = html.join('');

      if (this.onRender) {
        this.onRender();
      }

      return this;
    }
  });

  utils.prepend = function(options) {
    var el     = options.el,
        render = options.render;
    return el.insertBefore(render, el.firstChild);
  };

  utils.cleanModels = function(models) {
    for (var idx in models) {
      var model = models[idx];
      model.destroy();
    }
    models = [];
    return models;
  };

  return utils;
};