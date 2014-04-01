exports.init = function(noderplate) {
  var app         = noderplate.app,
      middlewares = noderplate.app.config.middlewares,
      api         = noderplate.app.controllers.api;

  app.post('/api/upload/file', middlewares.fileAnalytics, api.files.upload);
  app.post('/api/create/room', api.rooms.create);

  // app.get('/api/users', middlewares.requireLogin, api.users.all);

  return;
};