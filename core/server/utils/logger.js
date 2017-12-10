/**
 * Logger
 * 
 * @todo 
 * - logger config
 * @see
 * - https://github.com/winstonjs/winston
 */

const { createLogger, format, transports } = require('winston')

const logger = createLogger()

module.exports = logger