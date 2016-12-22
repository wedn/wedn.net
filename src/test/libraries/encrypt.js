import test from 'ava'
import { hash, compare } from '../../server/libraries/encrypt'

test('libraries.encrypt', async t => {
  const res = await hash('123')
  t.true(await compare('123', res))
  t.false(await compare('1233', res))
  t.false(await compare('1233', '1233'))
})
