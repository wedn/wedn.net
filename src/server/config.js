import path from 'path'
import merge from 'lodash.merge'

const defaults = {
  // Development **(default)**
  development: {
    url: 'http://localhost:2080/',

    // Server
    // Can be host & port (default), or socket
    server: {
      port: '2080',
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
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, '../content/data/wedn-dev.db')
      },
      debug: true,
      // useNullAsDefault: true
    },

    // Compress
    compress: true,

    // Storage
    storage: {},

    // Paths
    paths: {
      asset: path.resolve(__dirname, '../content/assets/'),
      data: path.resolve(__dirname, '../content/data/'),
      plugin: path.resolve(__dirname, '../content/plugins/'),
      theme: path.resolve(__dirname, '../content/themes/'),
      upload: path.resolve(__dirname, '../content/uploads/'),
      view: path.resolve(__dirname, '../content/views/')
    },

    // Cookie keys (can not modify)
    keys: ['wedn.net', 'www.wedn.net']
  },

  // Production
  production: {
    url: 'http://localhost:2080/',

    // Server
    // Can be host & port (default), or socket
    server: {
      port: '2080',
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
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, '../content/data/wedn.db')
      },
      debug: true,
      // useNullAsDefault: true
    },

    // Compress
    compress: true,

    // Storage
    storage: {},

    // Paths
    paths: {
      asset: path.resolve(__dirname, '../content/assets/'),
      data: path.resolve(__dirname, '../content/data/'),
      plugin: path.resolve(__dirname, '../content/plugins/'),
      theme: path.resolve(__dirname, '../content/themes/'),
      upload: path.resolve(__dirname, '../content/uploads/'),
      view: path.resolve(__dirname, '../content/views/')
    },

    // Cookie keys (can not modify)
    keys: ['wedn.net', 'www.wedn.net']
  }
}

let config

try {
  config = require('../config')
} catch (e) {
  config = null
}

// Node envionment
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default merge(defaults, config)[process.env.NODE_ENV]
