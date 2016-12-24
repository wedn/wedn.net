import db from './db'

const { key } = db.validate

/**
 * TermMeta Model
 * @type {Model}
 */
export default db.define('TermMeta', {
  key: {
    field: db.utils.fieldName('key'),
    type: db.Sequelize.STRING(60),
    unique: 'term',
    allowNull: false,
    defaultValue: '',
    comment: 'term meta key',
    validate: { key }
  },
  value: {
    field: db.utils.fieldName('value'),
    type: db.Sequelize.STRING(2000),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'term meta value',
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
  tableName: db.utils.tableName('term_meta')
}))
