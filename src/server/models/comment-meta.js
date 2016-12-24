import db from './db'

const { key } = db.validate

/**
 * CommentMeta Model
 * @type {Model}
 */
export default db.define('CommentMeta', {
  key: {
    field: db.utils.fieldName('key'),
    type: db.Sequelize.STRING(60),
    unique: 'comment',
    allowNull: false,
    defaultValue: '',
    comment: 'comment meta key',
    validate: { key }
  },
  value: {
    field: db.utils.fieldName('value'),
    type: db.Sequelize.STRING(2000),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'comment meta value',
    validate: {}
  },
  commentId: {
    field: db.utils.fieldName('comment_id'),
    type: db.Sequelize.INTEGER,
    unique: 'comment',
    allowNull: true,
    defaultValue: null,
    comment: 'comment id',
    validate: {}
  }
}, db.utils.tableOptions({
  timestamps: false,
  tableName: db.utils.tableName('comment_meta')
}))
