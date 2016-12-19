import Sequelize from 'sequelize'

import config from '../config'

const sequelize = new Sequelize(config.database)

const tableName = name => `w_${name}`
const fieldName = name => name

export {
  sequelize as db,
  Sequelize,
  tableName,
  fieldName
}
