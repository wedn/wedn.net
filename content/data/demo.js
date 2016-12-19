var join = require('path').join
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: join(__dirname, 'micua-dev.db')
  },
  debug: true
})
var bookshelf = require('bookshelf')(knex)

var User = bookshelf.Model.extend({
  tableName: 'users'
})

User.where('id', 1).fetch().then(function (user) {
  console.log(user.toJSON())
}).catch(function (err) {
  console.error(err)
})
