import test from 'ava'
import { User } from '../../server/models'

const users = []

test.before(async t => {
  const user = await User.add('zce-demo', 'demo@wedn.net', '2345689', 'Stone', 'zce-demo', '13241087977', 'administrator', 'activated')
  users.push(user)
})

test('models.user.getBySlug', async t => {
  const user = await User.getBySlug('zce-demo')
  t.is(user.nickname, 'Stone')
})

test('models.user.getByUsername', async t => {
  const user = await User.getByUsername('zce-demo')
  t.is(user.nickname, 'Stone')
})

test('models.user.getByEmail', async t => {
  const user = await User.getByEmail('demo@wedn.net')
  t.is(user.nickname, 'Stone')
})

test('models.user.getByMobile', async t => {
  const user = await User.getByMobile('13241087977')
  t.is(user.nickname, 'Stone')
})

test('models.user.getByUnique', async t => {
  const user1 = await User.getByUnique('zce-demo')
  const user2 = await User.getByUnique('demo@wedn.net')
  const user3 = await User.getByUnique('13241087977')
  t.is(user1.nickname, user2.nickname)
  t.is(user2.nickname, user3.nickname)
})

test('models.user.add', async t => {
  const username = Date.now()
  const user = await User.add('a' + username, username + 'demo@wedn.net', '12345678')
  t.not(user.id, 0)
  users.push(user)
})

test('models.user.add2', async t => {
  const username = Date.now()
  const user = await User.add({
    username: 'a' + username,
    password: '12345678',
    email: username + 'demo@wedn.net'
  })
  t.not(user.id, 0)
  users.push(user)
})

test('models.user.demo', async t => {
  // const user = await User.getByUsername('zce-demo')
  // user.set('slug', 'world')
})

test.after(async t => {
  await Promise.all(users.map(user => user.destroy()))
})
