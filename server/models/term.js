import db from './db'

const Term = db.Model.extend({
  tableName: 'terms'
})

export default Term
