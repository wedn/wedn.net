const log4js = require('log4js')
const logger = log4js.getLogger()

// default level is OFF - which means no logs at all.
// ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
// auto

logger.level = 'auto'

console.log('AllEnabled: ', logger.isAllEnabled())
logger.all('some all messages...')

console.log('TraceEnabled: ', logger.isTraceEnabled())
logger.trace('some trace messages...')

console.log('DebugEnabled: ', logger.isDebugEnabled())
logger.debug('some debug messages...')

console.log('InfoEnabled: ', logger.isInfoEnabled())
logger.info('some info messages...')

console.log('WarnEnabled: ', logger.isWarnEnabled())
logger.warn('some warn messages...')

console.log('ErrorEnabled: ', logger.isErrorEnabled())
logger.error('some error messages...')

console.log('FatalEnabled: ', logger.isFatalEnabled())
logger.fatal('some fatal messages...')

console.log('MarkEnabled: ', logger.isMarkEnabled())
logger.mark('some mark messages...')

console.log('OffEnabled: ', logger.isOffEnabled())
logger.off('some off messages...')

// console.dir(logger.__proto__)
