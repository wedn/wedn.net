/**
 * TODO: logger config
 */
const path = require('path')
const log4js = require('log4js')
const config = require('../config')

log4js.configure({
  appenders: {
    stdout: {
      type: 'stdout'
    },
    file: {
      type: 'file',
      filename: path.join(config.paths.logs, 'error.log'),
      maxLogSize: 5 * 1024 * 1024,
      backups: 10,
      compress: true
    },
    dateFile: {
      type: 'dateFile',
      filename: path.join(config.paths.logs, 'access.log'),
      pattern: '-yyyy-MM-dd',
      compress: true
    }
  },
  categories: {
    default: { appenders: ['stdout'], level: 'all' },
    access: { appenders: ['dateFile'], level: 'auto' },
    error: { appenders: ['file'], level: 'info' }
  }
})

module.exports = log4js.getLogger()
