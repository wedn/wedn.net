import db from './db'

const { key } = db.validate

/**
 * UserMeta Model
 * @type {Model}
 */
export default db.define('userMeta', {
  key: {
    field: db.utils.fieldName('key'),
    type: db.Sequelize.STRING(60),
    unique: 'user',
    allowNull: false,
    defaultValue: '',
    comment: 'user meta key',
    validate: { key }
  },
  value: {
    field: db.utils.fieldName('value'),
    type: db.Sequelize.STRING(2000),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'user meta value',
    validate: {}
  },
  userId: {
    field: db.utils.fieldName('user_id'),
    type: db.Sequelize.INTEGER,
    unique: 'user',
    allowNull: true,
    defaultValue: null,
    comment: 'user id',
    validate: {}
  }
}, db.utils.tableOptions({
  timestamps: false,
  tableName: db.utils.tableName('user_meta')
}))
