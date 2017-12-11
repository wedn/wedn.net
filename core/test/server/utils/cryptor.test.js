const test = require('ava')

const { cryptor } = require('../../../server/utils')

test('server/utils/cryptor#hash', async t => {
  const hash = await cryptor.hash('zce')
  t.truthy(hash)
})

test('server/utils/cryptor#compare', async t => {
  const hash = '$2a$08$z4J8Uvd/OiLnRNWAjAEWseYQ5Jqr79Qe90Ym6IFi0losP0.gDTRNi'
  const matched1 = await cryptor.compare('zce', hash)
  t.true(matched1)
  const matched2 = await cryptor.compare('zce1', hash)
  t.false(matched2)
})

test('server/utils/cryptor#encrypt', t => {
  const hash = cryptor.encrypt('zce')
  t.is(hash, '2c21383c28b2978a62389e9577444535')
})

test('server/utils/cryptor#decrypt', t => {
  const plain = cryptor.decrypt('2c21383c28b2978a62389e9577444535')
  t.is(plain, 'zce')
})

test('server/utils/cryptor#md5', t => {
  const hash = cryptor.md5('zce')
  t.is(hash, 'f1963aa09931b5dade50485239cc40bc')
  const upperHash = cryptor.md5('zce', true)
  t.is(upperHash, 'F1963AA09931B5DADE50485239CC40BC')
})
