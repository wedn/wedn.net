import path from 'path'
import merge from 'lodash.merge'

import pkg from '../package.json'

const defaults = {
  // ### Production
  production: {
    url: 'http://www.wedn.net/',
    root: '/',

    // #### Email
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

    // #### Database
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/data/wedn.db')
      },
      debug: false,
      // useNullAsDefault: true
    },

    // #### Server
    // Can be host & port (default), or socket
    server: {
      host: '127.0.0.1',
      port: '2080'
    },

    // #### Compress
    compress: true,

    // #### Storage
    storage: {},

    // #### Paths
    paths: {
      content: path.resolve(__dirname, '../content/'),
      data: path.resolve(__dirname, '../content/data/'),
      plugin: path.resolve(__dirname, '../content/plugins/'),
      upload: path.resolve(__dirname, '../content/uploads/'),
      theme: path.resolve(__dirname, '../content/themes/')
    },

    // #### Cookie keys (can not modify)
    keys: ['wedn.net', 'www.wedn.net']
  },

  // ### Development **(default)**
  development: {
    url: 'http://localhost:2080/',
    root: '/',

    // #### Email
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

    // #### Database
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/data/wedn-dev.db')
      },
      debug: true,
      // useNullAsDefault: true
    },

    // #### Server
    // Can be host & port (default), or socket
    server: {
      host: '127.0.0.1',
      port: '2080'
    },

    // #### Compress
    compress: true,

    // #### Storage
    storage: {},

    // #### Paths
    paths: {
      content: path.resolve(__dirname, '../content/'),
      data: path.resolve(__dirname, '../content/data/'),
      plugin: path.resolve(__dirname, '../content/plugins/'),
      upload: path.resolve(__dirname, '../content/uploads/'),
      theme: path.resolve(__dirname, '../content/themes/')
    },

    // #### Cookie keys (can not modify)
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
const env = process.env.NODE_ENV || 'development'

export default Object.assign({ name: pkg.name, version: pkg.version }, merge(defaults, config)[env])
