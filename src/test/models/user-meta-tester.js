import test from 'ava'
import { User } from '../../server/models'

// C
test.before(async t => {
  await User.sync({ force: true })
  await User.Meta.sync({ force: true })
  /*
    const user = await User.create({
      slug: 'zce-demo',
      username: 'zce-demo',
      password: '123456789012345678901234567890123456789012345678901234567890',
      nickname: 'iceStone',
      email: 'zce-demo@wedn.net',
      mobile: '13888888888',
      status: 'activated',
      role: 'administrator'
    })
    t.not(user.id, 0)
    const meta1 = await User.Meta.create({
      userId: user.id,
      key: 'ext_key1',
      value: Date.now()
    })
    t.not(meta1.id, 0)
    const meta2 = await User.Meta.create({
      userId: user.id,
      key: 'ext_key2',
      value: Date.now()
    })
    t.true(meta2.id > meta1.id)
   */
  const user = await User.create({
    slug: 'zce-demo',
    username: 'zce-demo',
    password: '123456789012345678901234567890123456789012345678901234567890',
    nickname: 'iceStone',
    email: 'zce-demo@wedn.net',
    mobile: '13888888888',
    status: 'activated',
    role: 'administrator'
  })
  t.not(user.id, 0)
  const meta1 = await User.Meta.create({
    key: 'ext_key11',
    value: Date.now()
  })
  // await user.addMeta(meta1)
  // t.truthy(meta1.id)
  const meta2 = await User.Meta.create({
    key: 'ext_key12',
    value: Date.now()
  })
  // await user.addMeta(meta2)
  // t.truthy(meta2.id)
  // 重置其他
  await user.setMeta([meta1, meta2])
  t.truthy(meta1.id)
  t.truthy(meta2.id)
})

// R
test('models.user.meta', async t => {
  const user1 = await User.getBySlug('zce-demo')
  const meta1 = await user1.getMeta()
  t.is(meta1[0].key, 'ext_key11')
  t.truthy(meta1[1])
  // ===========================
  const user2 = await User.getBySlug('zce-demo')
  const meta2 = await user2.getMeta()
  meta2[1].value = 'ok'
  meta2[1].save()
  const meta22 = await user2.getMeta()
  t.is(meta22[1].value, 'ok')
  // ===========================
  const user3 = await User.getBySlug('zce-demo')
  const meta3 = await user3.getMeta()
  meta3.forEach(async item => user3.removeMeta(meta3[1]))
  const meta32 = await user3.getMeta()
  t.falsy(meta32[1])
})
