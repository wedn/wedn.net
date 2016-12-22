import db from './db'

/**
 * Option Model
 * @type {Model}
 */
export const Option = db.define('option', {
  key: {
    field: db.utils.fieldName('key'),
    type: db.Sequelize.STRING(60),
    unique: true,
    allowNull: false
  },
  value: {
    field: db.utils.fieldName('value'),
    type: db.Sequelize.STRING(2000),
    allowNull: false,
    defaultValue: ''
  },
  enabled: {
    field: db.utils.fieldName('enabled'),
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  createdAt: false,
  underscored: true,
  tableName: db.utils.tableName('options'),
  classMethods: {},
  instanceMethods: {}
})

Option.sync({ force: false })
