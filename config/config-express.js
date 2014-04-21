exports.init = function(noderplate) {
  var app        = noderplate.app,
      path       = noderplate.imports.path,
      express    = noderplate.imports.express,
      MongoStore = noderplate.app.MongoStore,
      rootPath   = path.normalize(__dirname + '/..');

  app.env = noderplate.config.env || 'prod';

  app.use(function(req, res, next) {
    req.core = app.core;
    next();
  });

  app.use(function(req, res, next) {
    req.core = app.core;
    res.setHeader('Strict-Transport-Security', 'max-age=631138519');
    res.setHeader('Version', 'HTTP/1.1');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-UA-Compatible', 'IE=10,chrome=1');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  app.set('port', noderplate.config.appPort || 3000);
  app.set('views', rootPath + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());

  if (app.env === 'dev') {
    app.use(express.logger('dev'));
  }

  if (app.env === 'prod') {
    app.use(express.logger());
  }

  app.use(express.limit(noderplate.config.express.uploadLimit));
  app.use(express.bodyParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());

  app.use(express.session({
    store: noderplate.sessionStore,
    cookie: {maxAge: noderplate.config.session.cookie.maxAge},
    secret: noderplate.config.session.secret
  }));

  app.use(app.router);

  app.use(express.compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(rootPath + '/public'));

  if ('dev' === app.env) {
    app.use(express.errorHandler());
  }
};