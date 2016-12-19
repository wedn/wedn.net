import db from './db'

const Option = db.Model.extend({
  tableName: 'options'
})

export {
  Option
}
