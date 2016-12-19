import { db, Sequelize, tableName, fieldName } from './db'

export const Option = db.define('option', {
  key: { field: fieldName('key'), type: Sequelize.STRING(60), unique: true, allowNull: false },
  value: { field: fieldName('value'), type: Sequelize.TEXT('tiny'), allowNull: false, defaultValue: '' },
  enabled: { field: fieldName('enabled'), type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
}, {
  createdAt: false,
  underscored: true,
  tableName: tableName('options')
})

Option.sync({ force: false })
