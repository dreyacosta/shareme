'use strict';

module.exports = {
  development: {
    env: 'dev',
    appPort: 3000,
    express: {
      uploadLimit: 10000000
    },
    session: {
      cookie: {
        maxAge: 6000
      },
      secret: 'secret'
    },
    mongodb: {
      host: 'localhost',
      database: 'test'
    },
    sendmail: {
      service: 'Gmail',
      user: 'yourmail@gmail.com',
      bcc: 'bccmail@gmail.com',
      pass: 'pass'
    },
    roomLifespan: 90,
    roomFilesPath: './files/',
    userFilesPath: './users/'
  },
  production: {
    env: 'prod',
    appPort: 80,
    express: {
      uploadLimit: 10000000
    },
    session: {
      cookie: {
        maxAge: 6000
      },
      secret: 'secret'
    },
    mongodb: {
      host: 'localhost',
      database: 'shareme'
    },
    sendmail: {
      service: 'Gmail',
      user: 'yourmail@gmail.com',
      bcc: 'bccmail@gmail.com',
      pass: 'pass'
    },
    roomLifespan: 90,
    roomFilesPath: './files/',
    userFilesPath: './users/'
  },
  simplemocha: {
    env: 'test',
    appPort: 3000,
    express: {
      uploadLimit: 10000000
    },
    session: {
      cookie: {
        maxAge: 6000
      },
      secret: 'secret'
    },
    mongodb: {
      host: 'localhost',
      database: 'mocha'
    },
    sendmail: {
      service: 'Gmail',
      user: 'yourmail@gmail.com',
      bcc: 'bccmail@gmail.com',
      pass: 'pass'
    },
    roomLifespan: 90,
    roomFilesPath: './files/',
    userFilesPath: './users/'
  },
};