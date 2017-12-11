/**
 * Logger
 *
 * @todo
 * - logger config
 * @see
 * - https://github.com/winstonjs/winston
 */

const { createLogger, format, transports } = require('winston')

const config = require('../config')
const { level = 'info', error, access } = config.logger

const logger = createLogger()

logger.level = level

if (error) {
  logger.add(new transports.File({
    level: 'error',
    timestamp: true,
    maxsize: 10 * 1024 * 1024,
    filename: error
  }))
}

if (access) {
  logger.add(new transports.File({
    level: 'verbose',
    timestamp: true,
    maxsize: 1 * 1024 * 1024,
    format: format(info => info.level === 'verbose' && info)(),
    filename: access
  }))
}

logger.add(new transports.Console({
  colorize: true,
  format: format.simple()
}))

module.exports = logger
