const test = require('ava')

const { logger } = require('../../../server/utils')

test('server/utils/logger#error', t => {
  logger.log('error', 'zce')
  logger.error('zce')
  t.pass()
})

test('server/utils/logger#warn', t => {
  logger.log('warn', 'zce')
  logger.warn('zce')
  t.pass()
})

test('server/utils/logger#info', t => {
  logger.log('info', 'zce')
  logger.info('zce')
  t.pass()
})

test('server/utils/logger#verbose', t => {
  logger.log('verbose', 'zce')
  logger.verbose('zce')
  t.pass()
})

test('server/utils/logger#debug', t => {
  logger.log('debug', 'zce')
  logger.debug('zce')
  t.pass()
})

test('server/utils/logger#silly', t => {
  logger.log('silly', 'zce')
  logger.silly('zce')
  t.pass()
})
