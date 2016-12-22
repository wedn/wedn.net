import test from 'ava'
import { User } from '../../server/models'

const users = []

test.before(async t => {
  const user = await User.add('zce', 'ice@wedn.net', '123', 'iceStone', 'zce', '13241087977', 'administrator', 'activated')
  users.push(user)
})

test('method:getByUsername', async t => {
  const user = await User.getByUsername('zce')
  t.is(user.email, 'ice@wedn.net')
})

test('method:getByEmail', async t => {
  const user = await User.getByEmail('ice@wedn.net')
  t.is(user.nickname, 'iceStone')
})

test('method:add', async t => {
  const username = Date.now()
  const user = await User.add(username, username + '@wedn.net', '123')
  t.not(user.id, 0)
  users.push(user)
})

test('method:add:object', async t => {
  const username = Date.now()
  const user = await User.add({
    username: username,
    password: '123',
    email: username + '@wedn.net'
  })
  t.not(user.id, 0)
  users.push(user)
})

test.after(async t => {
  await Promise.all(users.map(user => user.destroy()))
})