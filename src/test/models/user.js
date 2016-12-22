import test from 'ava'
import { User } from '../../server/models'

const users = []

test.before(async t => {
  const user = await User.add('zce', 'ice@wedn.net', '12345689', 'iceStone', 'zce', '13241087977', 'administrator', 'activated')
  users.push(user)
})

test('models.user.getBySlug', async t => {
  const user = await User.getBySlug('zce')
  t.is(user.nickname, 'iceStone')
})

test('models.user.getByUsername', async t => {
  const user = await User.getByUsername('zce')
  t.is(user.nickname, 'iceStone')
})

test('models.user.getByEmail', async t => {
  const user = await User.getByEmail('ice@wedn.net')
  t.is(user.nickname, 'iceStone')
})

test('models.user.getByMobile', async t => {
  const user = await User.getByMobile('13241087977')
  t.is(user.nickname, 'iceStone')
})

test('models.user.getByUnique', async t => {
  const user1 = await User.getByUnique('zce')
  const user2 = await User.getByUnique('ice@wedn.net')
  const user3 = await User.getByUnique('13241087977')
  t.is(user1.nickname, user2.nickname)
  t.is(user2.nickname, user3.nickname)
})

test('models.user.add', async t => {
  const username = Date.now()
  const user = await User.add('a' + username, username + '@wedn.net', '12345678')
  t.not(user.id, 0)
  users.push(user)
})

test('models.user.add2', async t => {
  const username = Date.now()
  const user = await User.add({
    username: 'a' + username,
    password: '12345678',
    email: username + '@wedn.net'
  })
  t.not(user.id, 0)
  users.push(user)
})

test.after(async t => {
  // await Promise.all(users.map(user => user.destroy()))
})
