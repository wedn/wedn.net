const test = require('ava')
const { User } = require('../../../server/models')

test(t => {
  t.pass('User model test')
})

// const fakeUser = {
//   username: 'fakeUser',
//   email: 'fakeUser@zce.me',
//   mobile: '13266668888',
//   password: 'wanglei'
// }

// test('server/models/user/create', async t => {
//   const entitry = await User.create(fakeUser)
//   fakeUser.id = entitry.id
//   t.truthy(entitry.id)
//   const error = await t.throws(User.create(fakeUser))
//   t.true(error.message.includes('duplicate key error'))
//   await User.remove({ id: fakeUser.id })
//   delete fakeUser.id
// })

// test('server/models/user/find', async t => {
//   const saved = await User.create(fakeUser)
//   fakeUser.id = saved.id
//   const users = await User.find()
//   const user = users.find(u => u.id === fakeUser.id)
//   t.is(user.mobile, fakeUser.mobile.toLowerCase())
//   t.is(user.email, fakeUser.email.toLowerCase())
// })
