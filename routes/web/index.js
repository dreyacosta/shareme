exports.init = function(noderplate) {
  var app = noderplate.app,
      web = noderplate.app.controllers.web;

  app.post('/', web.users.register);
  app.post('/login', web.users.login);
  app.post('/register', web.users.register);

  app.get('/:room?', web.home.render);
  app.get('/:room/file/:filename', web.files.getFile);

  // app.get('/u/login', web.users.login);
  // app.get('/u/register', web.users.register);
  // app.get('/u/logout', web.users.logout);

  return;
};