import db from './db'

var User = db.Model.extend({
  tableName: 'users'
})

export default User
