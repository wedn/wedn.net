import Sequelize from 'sequelize'

import config from '../config'

const db = new Sequelize(config.database)

db.utils = {
  tableName: name => `w_${name}`,
  fieldName: name => name
}

db.validate = {
  slug: /^[a-z0-9-]+$/i,
  username: /^[a-z0-9_-]{3,16}$/i,
  key: /^[a-z][a-z0-9_]+$/i,
  mobile: input => input === '' || /^[0-9]+$/.test(input)
}

export default db
