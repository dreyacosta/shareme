'use strict';

exports.init = function(noderplate) {
  var app         = noderplate.app,
      middlewares = noderplate.app.config.middlewares,
      web         = noderplate.app.controllers.web;

  app.post('/', web.users.register);
  app.post('/login', web.users.login);
  app.post('/register', web.users.register);

  app.get('/:room?', web.home.render);
  app.get('/:room/file/:filename', web.files.getFile);
  app.get('/:room/file/preview/:filename', web.files.getFile);
  // app.get('/:room/file/page/preview/:filename', web.files.getFile);

  // app.get('/profile/:username?', middlewares.requireLogin, web.users.profile);
  // app.get('/profile/:username/file/preview/:filename', middlewares.requireLogin, web.files.getFile);

  // app.get('/u/login', web.users.login);
  // app.get('/u/register', web.users.register);
  // app.get('/u/logout', web.users.logout);

  return;
};