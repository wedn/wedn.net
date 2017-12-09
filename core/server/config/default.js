const path = require('path')
const pkg = require('../../../package.json')

module.exports = {
  // ## App info
  pkg: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description
  },

  // ## Server
  // > Can be host & port (default), or socket
  server: {
    port: process.env.PORT || '2080',
    host: '127.0.0.1',
    url: 'http://127.0.0.1:2080'
  },

  // ## Paths
  paths: {
    data: path.resolve(__dirname, '../../content/data/'),
    locales: path.resolve(__dirname, '../../content/locales/'),
    logs: path.resolve(__dirname, '../../content/logs/'),
    themes: path.resolve(__dirname, '../../content/themes/'),
    plugins: path.resolve(__dirname, '../../content/plugins/'),
    uploads: path.resolve(__dirname, '../../content/uploads/')
  },

  // ## Database
  database: {
    uri: 'mongodb://localhost/wedn-dev',
    // http://mongoosejs.com/docs/connections.html#options
    options: { useMongoClient: true, poolSize: 10 }
  },

  // ## Logger
  logger: {},

  // ## Storage
  storage: {},

  // ## Compress
  compress: {
    filter: /text/i,
    threshold: 50 * 1024
  },

  // ## Cookie keys
  // > can not modify when application running
  cookie: {
    keys: ['wedn.net', 'www.wedn.net']
  },

  // ## Session
  session: {
    key: 'wedn:zce',    // (string) cookie key (default is koa:sess)
    maxAge: 86400000,   // (number) maxAge in ms (default is 1 days)
    overwrite: true,    // (boolean) can overwrite or not (default true)
    httpOnly: true,     // (boolean) httpOnly or not (default true)
    signed: true        // (boolean) signed or not (default true)
  },

  // ## Encrypt
  encrypt: {
    secret: 'wedn.net',  // encrypt secret
    saltRounds: 8        // Salt rounds
  },

  // ## Json Web Token
  jwt: {
    secret: 'https://wedn.net',
    issuer: 'https://account.wedn.net',
    audience: 'https://wedn.net',
    expries: 30 * 24 * 60 * 60
  }
}
