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

const logger = createLogger()

Object.keys(config.logger).forEach(level => {
  logger.add(new transports.File({ level, filename: config.logger[level] }))
})

logger.add(new transports.Console({ level: 'debug' }))

module.exports = logger
