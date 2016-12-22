import test from 'ava'

test('foo', t => {
  t.pass()
})

test('bar', async t => {
  const bar = Promise.resolve('bar')

  t.is(await bar, 'bar')
})

// import Sequelize from 'sequelize'

// import config from '../server/config'

// const sequelize = new Sequelize(config.database)

// const User = sequelize.define('user', {
//   firstName: {
//     type: Sequelize.STRING,
//     field: 'first_name'
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// }, {
//   freezeTableName: true
// })

// User.sync({ force: true }).then(() => {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   })
// })
