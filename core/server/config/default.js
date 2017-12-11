const path = require('path')
const pkg = require('../../../package.json')

const rootDir = path.join(__dirname, '../../..')

const paths = {
  data: path.join(rootDir, 'content', 'data'),
  locales: path.join(rootDir, 'content', 'locales'),
  logs: path.join(rootDir, 'content', 'logs'),
  themes: path.join(rootDir, 'content', 'themes'),
  plugins: path.join(rootDir, 'content', 'plugins'),
  uploads: path.join(rootDir, 'content', 'uploads')
}

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
  paths: paths,

  // ## Database
  database: {
    uri: 'mongodb://localhost/wedn-dev',
    // http://mongoosejs.com/docs/connections.html#options
    options: { useMongoClient: true, poolSize: 10 }
  },

  // ## Mail
  // > https://nodemailer.com/smtp/#examples
  mail: {
    name: 'WEDN.NET',
    host: 'smtp.exmail.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: 'service@wedn.net',
      pass: 'RFh8JbcWt8y*'
    }
  },

  // ## Logger
  logger: {
    level: 'info',
    error: path.join(paths.logs, 'error.log'),
    access: path.join(paths.logs, 'access.log'),
  },

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
