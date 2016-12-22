import test from 'ava'
import { User } from '../../server/models'

test('method:getByUsername', async t => {
  const user = await User.getByUsername('zce')
  t.is(user.email, 'ice@wedn.net')
})

test('method:getByEmail', async t => {
  const user = await User.getByEmail('ice@wedn.net')
  t.is(user.nickname, 'iceStone')
})

test('method:add', async t => {
})
