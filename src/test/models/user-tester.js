import test from 'ava'
import { User } from '../../server/models'

const users = []

// ================== before ==========================

test.before(async t => {
  await User.sync({ force: true })
  const user = await User.add('zce-demo', 'demo@wedn.net', '2345689', 'Stone', 'zce-demo', '13241087977', 'administrator', 'activated')
  users.push(user)
})

// ================== get ==========================

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

// ================== add ==========================

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

// ================== getter & setter (meta) ==========================

test('models.user.meta.1', async t => {
  try {
    const user = await User.getByMobile('13241087977')
    await user.setMeta('hello', 'world')
    await user.setMeta('hello', 'world2')
    await user.setMeta('hello2', 'world')
    const res = await user.getMeta()
    t.not(Object.keys(res).length, 0)
  } catch (e) {
    console.log(e)
  }
})

test('models.user.meta.2', async t => {
  try {
    const user = await User.getByMobile('13241087977')
    await user.setMeta({
      hello: 'world',
      demo: 'aaaa'
    })
    const res = await user.getMeta()
    t.not(Object.keys(res).length, 0)
  } catch (e) {
    console.log(e)
  }
})

// ================== after ==========================

test.after(async t => {
  await Promise.all(users.map(user => user.destroy()))
})

// ================== meta ==========================

// test('models.user.meta1', async t => {
//   const user = await User.create({
//     slug: 'demo1',
//     username: 'demo1',
//     password: '012345678901234567890123456789012345678901234567890123456789',
//     nickname: 'demo1',
//     email: 'demo1@wedn.net',
//     mobile: '1111231233',
//     status: 'activated',
//     role: 'administrator'
//   })
//   const meta = await UserMeta.create({
//     key: 'description',
//     value: 'make IT better'
//   })
//   await user.addMeta(meta)
//   const res = await user.getMeta()
//   console.log(res)
// })

// test('models.user.meta2', async t => {
//   const user = await User.getByUsername('zce-demo')
//   const meta = await UserMeta.create({
//     key: 'description',
//     value: 'make IT better'
//   })
//   await user.addMeta(meta)
//   const res = await user.getMeta()
//   console.log(res)
// })
