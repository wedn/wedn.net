const test = require('ava')

const { logger } = require('../../../server/utils')

test('server/utils/logger#debug', t => {
  logger.debug('zce')
  t.pass()
})

test('server/utils/logger#verbose', t => {
  logger.verbose('zce')
  t.pass()
})

test('server/utils/logger#error', t => {
  logger.error('zce')
  t.pass()
})
