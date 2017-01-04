import path from 'path'
import pkg from '../../package.json'

// # Config
// > TODO: environment
const config = {
  // ## App info
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,

  // ## Root
  root: '/',

  // ## Server
  // > Can be host & port (default), or socket
  server: {
    port: process.env.PORT || '2080',
    host: '127.0.0.1'
  },

  logger: {
    type: 'file',
    filename: path.resolve(__dirname, '../../content/logs/wedn.net.log')
  },

  // ## Paths
  paths: {
    data: path.resolve(__dirname, '../../content/data/'),
    themes: path.resolve(__dirname, '../../content/themes/'),
    static: path.resolve(__dirname, '../../content/static/'),
    plugins: path.resolve(__dirname, '../../content/plugins/'),
    uploads: path.resolve(__dirname, '../../content/uploads/')
  },

  // // ## Database
  // database: {
  //   database: 'wedn',
  //   username: 'root',
  //   password: 'wanglei',
  //   dialect: 'mysql',
  //   // logging: false,
  //   pool: { max: 5, min: 0, idle: 10000 }
  // },
  database: {
    database: 'wedn',
    dialect: 'sqlite',
    logging: false,
    pool: { max: 5, min: 0, idle: 10000 },
    storage: path.resolve(__dirname, '../../content/data/', 'wedn-dev.db')
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
    key: 'wedn.net',  // encrypt key
    salt_rounds: 8    // Salt rounds
  },

  // ## Json Web Token
  jwt: {
    secretOrKey: 'wedn.net',
    issuer: 'account.wedn.net',
    audience: 'wedn.net',
    expries: 2 * 60 * 60
  }

  // ## getter & setter
  // set app (app) {
  // },

  // get app () {
  // }
}

export default config

// import path from 'path'
// import merge from 'lodash.merge'

// const defaults = {
//   // Development **(default)**
//   development: {
//     url: 'http://localhost:2080/',

//     // Server
//     // Can be host & port (default), or socket
//     server: {
//       port: '2080',
//       host: '127.0.0.1'
//     },

//     // Email
//     mail: {
//       transport: 'SMTP',
//       options: {
//         'host': 'smtp.exmail.qq.com',
//         'port': 25,
//         'secure': false,
//         'name': 'Hello Micua',
//         'auth': {
//           'user': 't1@wedn.net',
//           'pass': '2014@itcast'
//         }
//       }
//     },

//     // Database
//     database: {
//       client: 'sqlite3',
//       connection: {
//         filename: path.resolve(__dirname, '../content/data/wedn-dev.db')
//       },
//       // useNullAsDefault: true,
//       debug: true
//     },

//     // Compress
//     compress: true,

//     // Storage
//     storage: {},

//     // Paths
//     paths: {
//       asset: path.resolve(__dirname, '../../content/assets/'),
//       data: path.resolve(__dirname, '../../content/data/'),
//       plugin: path.resolve(__dirname, '../../content/plugins/'),
//       theme: path.resolve(__dirname, '../../content/themes/'),
//       upload: path.resolve(__dirname, '../../content/uploads/'),
//       view: path.resolve(__dirname, './views/')
//     },

//     // Cookie keys (can not modify)
//     keys: ['wedn.net', 'www.wedn.net']
//   },

//   // Production
//   production: {
//     url: 'http://localhost:2080/',

//     // Server
//     // Can be host & port (default), or socket
//     server: {
//       port: '2080',
//       host: '127.0.0.1'
//     },

//     // Email
//     mail: {
//       transport: 'SMTP',
//       options: {
//         'host': 'smtp.exmail.qq.com',
//         'port': 25,
//         'secure': false,
//         'name': 'Hello Micua',
//         'auth': {
//           'user': 't1@wedn.net',
//           'pass': '2014@itcast'
//         }
//       }
//     },

//     // Database
//     database: {
//       client: 'sqlite3',
//       connection: {
//         filename: path.resolve(__dirname, '../content/data/wedn.db')
//       },
//       // useNullAsDefault: true,
//       debug: true
//     },

//     // Compress
//     compress: true,

//     // Storage
//     storage: {},

//     // Paths
//     paths: {
//       asset: path.resolve(__dirname, '../content/assets/'),
//       data: path.resolve(__dirname, '../content/data/'),
//       plugin: path.resolve(__dirname, '../content/plugins/'),
//       theme: path.resolve(__dirname, '../content/themes/'),
//       upload: path.resolve(__dirname, '../content/uploads/'),
//       view: path.resolve(__dirname, '../content/views/')
//     },

//     // Cookie keys (can not modify)
//     keys: ['wedn.net', 'www.wedn.net']
//   }
// }

// let config

// try {
//   config = require('../config')
// } catch (e) {
//   config = null
// }

// // Node envionment
// process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// export default merge(defaults, config)[process.env.NODE_ENV]
