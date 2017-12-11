const test = require('ava')

const { validator } = require('../../../server/utils')

test('server/utils/validator#isKey', t => {
  t.true(validator.isKey('zce_me'))
  t.false(validator.isKey('zce-me'))
  t.false(validator.isKey('zce.me'))
})

test('server/utils/validator#isSlug', t => {
  t.true(validator.isSlug('zce_me'))
  t.true(validator.isSlug('zce-me'))
  t.false(validator.isSlug('zce.me'))
  t.false(validator.isSlug('1-100'))
})

test('server/utils/validator#isUsername', t => {
  t.true(validator.isUsername('zce'))
  t.true(validator.isUsername('a10'))
  t.true(validator.isUsername('abcdefghijklmn'))
  t.false(validator.isUsername('a'))
  t.false(validator.isUsername('100'))
  t.false(validator.isUsername('FOO'))
})

test('server/utils/validator#isPassword', t => {
  t.true(validator.isPassword('wanglei'))
  t.false(validator.isPassword('foo'))
  t.false(validator.isPassword('foofoofoofoofoofoo'))
})

test('server/utils/validator#isNickname', t => {
  t.true(validator.isNickname('zce'))
  t.true(validator.isNickname('汪磊'))
  t.true(validator.isNickname('z'))
  t.true(validator.isNickname('磊'))
  t.false(validator.isNickname('汪磊汪磊汪磊汪磊汪磊汪磊'))
})

test('server/utils/validator#isMobile', t => {
  t.true(validator.isMobile('13888888888'))
  t.false(validator.isMobile('foo'))
})
