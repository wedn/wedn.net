import path from 'path'
import _ from 'lodash'

const defaults = {
  // ### Production
  production: {
    url: 'http://www.wedn.net/',

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
      debug: true
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
      content: path.join(__dirname, '/content/'),
      data: path.join(__dirname, '/content/data/'),
      plugin: path.join(__dirname, '/content/plugins/'),
      upload: path.join(__dirname, '/content/uploads/'),
      theme: path.join(__dirname, '/content/themes/')
    },

    // #### Cookie keys (can not modify)
    keys: ['wedn.net', 'www.wedn.net']
  },

  // ### Development **(default)**
  development: {
    url: 'http://localhost:2080/',

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
      debug: true
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
      content: path.join(__dirname, '/content/'),
      data: path.join(__dirname, '/content/data/'),
      plugin: path.join(__dirname, '/content/plugins/'),
      upload: path.join(__dirname, '/content/uploads/'),
      theme: path.join(__dirname, '/content/themes/')
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

export default _.merge(defaults, config)
