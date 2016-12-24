import db from './db'

/**
 * TermRelation Model
 * @type {Model}
 */
export default db.define('TermRelation', {
  postId: {
    field: db.utils.fieldName('post_id'),
    type: db.Sequelize.INTEGER,
    unique: 'term',
    allowNull: true,
    defaultValue: null,
    comment: 'post id',
    validate: {}
  },
  termId: {
    field: db.utils.fieldName('term_id'),
    type: db.Sequelize.INTEGER,
    unique: 'term',
    allowNull: true,
    defaultValue: null,
    comment: 'term id',
    validate: {}
  }
}, db.utils.tableOptions({
  timestamps: false,
  tableName: db.utils.tableName('term_relations')
}))
