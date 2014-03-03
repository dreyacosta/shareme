module.exports = {
  development: {
    env: 'dev',
    appPort: 3000,
    express: {
      uploadLimit: 10000000
    },
    session: {
      cookie: {
        maxAge: 60000
      },
      secret: 'secretcode'
    },
    mongodb: {
      host: 'localhost',
      database: 'test'
    },
    sendmail: {
      service: 'Gmail',
      user: 'youremail@gmail.com',
      pass: 'yourpass'
    }
  },
  production: {
    env: 'prod',
    appPort: 80,
    express: {
      uploadLimit: 10000000
    },
    session: {
      cookie: {
        maxAge: 60000
      },
      secret: 'secretcode'
    },
    mongodb: {
      host: 'localhost',
      database: 'prodb'
    },
    sendmail: {
      service: 'Gmail',
      user: 'youremail@gmail.com',
      pass: 'yourpass'
    }
  },
  simplemocha: {
    env: 'test',
    appPort: 3000,
    express: {
      uploadLimit: 10000000
    },
    session: {
      cookie: {
        maxAge: 60000
      },
      secret: 'secretcode'
    },
    mongodb: {
      host: 'localhost',
      database: 'testing'
    },
    sendmail: {
      service: 'Gmail',
      user: 'youremail@gmail.com',
      pass: 'yourpass'
    }
  },
};