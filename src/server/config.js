import path from 'path'

export default {
  url: 'http://localhost:2080/',

  // Server
  // Can be host & port (default), or socket
  server: {
    port: process.env.PORT || '2080',
    host: '127.0.0.1'
  },

  // Email
  mail: {
    transport: 'SMTP',
    options: {
      'host': 'smtp.exmail.qq.com',
      'port': 25,
      'secure': false,
      'name': 'Hello Micua',
      'auth': {
        'user': 't1@wedn.net',
        'pass': '2014@itcast'
      }
    }
  },

  // Database
  // database: {
  //   database: 'wedn',
  //   username: 'root',
  //   password: 'wanglei',
  //   dialect: 'mysql',
  //   pool: { max: 5, min: 0, idle: 10000 },
  //   logging: false
  // },
  database: {
    database: 'wedn',
    dialect: 'sqlite',
    pool: { max: 5, min: 0, idle: 10000 },
    storage: path.resolve(__dirname, '../../content/data/', 'wedn-dev.db'),
    logging: false
  },

  // Compress
  compress: true,

  // Storage
  storage: {},

  // Paths
  paths: {
    data: path.resolve(__dirname, '../../content/data/'),
    plugin: path.resolve(__dirname, '../../content/plugins/'),
    static: path.resolve(__dirname, '../../content/static/'),
    theme: path.resolve(__dirname, '../../content/themes/'),
    upload: path.resolve(__dirname, '../../content/uploads/')
  },

  // Cookie keys (can not modify when application running)
  keys: ['wedn.net', 'www.wedn.net'],
  salt_rounds: 8,
}

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
