import test from 'ava'

test('foo', t => {
  t.pass()
})

test('bar', async t => {
  const bar = Promise.resolve('bar')

  t.is(await bar, 'bar')
})

// import './db'
// import User from '../server/models/user'

// User.sync({ force: false }).then(user => {
//   console.log(111111111111111111)
//   console.log(user)
//   console.log(111111111111111111)
//   // Table created
//   return User.create({
//     slug: Date.now(),
//     username: Date.now(),
//     password: Date.now(),
//     nickname: Date.now(),
//     email: Date.now(),
//     mobile: Date.now(),
//     status: Date.now(),
//     role: Date.now()
//   })
// })

// console.log(User.sync({ force: false }))

// import { User } from '../server/models'

// User.sync().then(user => {
//   // console.log(111111111111111111)
//   // console.log(user)
//   // console.log(111111111111111111)
//   // Table created
//   return User.create({
//     slug: Date.now(),
//     username: Date.now(),
//     password: Date.now(),
//     nickname: Date.now(),
//     email: Date.now(),
//     mobile: Date.now(),
//     status: Date.now(),
//     role: Date.now()
//   })
// })

// User.findAll()
//   .then(res => {
//     res.forEach(item => {
//       console.log(item.username)
//     })
//   })
