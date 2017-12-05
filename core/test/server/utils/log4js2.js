const path = require('path')
const log4js = require('log4js')

log4js.configure({
  appenders: {
    stdout: {
      type: 'stdout'
    },
    error: {
      type: 'file',
      filename: path.join(__dirname, 'logs', 'error.log'),
      maxLogSize: 5 * 1024 * 1024,
      backups: 10
    },
    access: {
      type: 'dateFile',
      filename: path.join(__dirname, 'logs', 'access.log'),
      pattern: '-yyyy-MM-dd'
    }
  },
  categories: {
    default: { appenders: ['stdout', 'error'], level: 'all' },
    access: { appenders: ['stdout', 'access'], level: 'all' }
  }
})

const logger = log4js.getLogger('access')

logger.all('some all messages...')
logger.trace('some trace messages...')
logger.debug('some debug messages...')
logger.info('some info messages...')
logger.warn('some warn messages...')
logger.error('some error messages...')
logger.fatal('some fatal messages...')
logger.mark('some mark messages...')
logger.off('some off messages...')
