import db from './db'

const { key } = db.validate

/**
 * PostMeta Model
 * @type {Model}
 */
export default db.define('PostMeta', {
  key: {
    field: db.utils.fieldName('key'),
    type: db.Sequelize.STRING(60),
    unique: 'post',
    allowNull: false,
    defaultValue: '',
    comment: 'post meta key',
    validate: { key }
  },
  value: {
    field: db.utils.fieldName('value'),
    type: db.Sequelize.STRING(2000),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'post meta value',
    validate: {}
  },
  postId: {
    field: db.utils.fieldName('post_id'),
    type: db.Sequelize.INTEGER,
    unique: 'post',
    allowNull: true,
    defaultValue: null,
    comment: 'post id',
    validate: {}
  }
}, db.utils.tableOptions({
  timestamps: false,
  tableName: db.utils.tableName('post_meta')
}))
