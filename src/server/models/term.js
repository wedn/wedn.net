import { db, Sequelize, tableName, fieldName } from './db'

export const Term = db.define('term', {
  slug: { field: fieldName('slug'), type: Sequelize.STRING(100), unique: 'term', allowNull: false },
  name: { field: fieldName('name'), type: Sequelize.STRING(100), allowNull: false },
  taxonomy: { field: fieldName('taxonomy'), type: Sequelize.STRING(20), unique: 'term', allowNull: false },
  description: { field: fieldName('description'), type: Sequelize.STRING(500), allowNull: false },
  count: { field: fieldName('count'), type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  parentId: { field: fieldName('parentId'), type: Sequelize.INTEGER, allowNull: false }
}, {
  underscored: true,
  tableName: tableName('terms')
})

export const TermMeta = db.define('termMeta', {
  key: { field: fieldName('key'), type: Sequelize.STRING(60), unique: 'term', allowNull: false },
  value: { field: fieldName('value'), type: Sequelize.TEXT('tiny'), allowNull: false, defaultValue: '' },
  termId: { field: fieldName('term_id'), type: Sequelize.INTEGER, unique: 'term', allowNull: false }
}, {
  timestamps: false,
  underscored: true,
  tableName: tableName('term_meta')
})

export const TermRelation = db.define('termRelation', {
  postId: { field: fieldName('post_id'), type: Sequelize.INTEGER, unique: 'term', allowNull: false },
  termId: { field: fieldName('term_id'), type: Sequelize.INTEGER, unique: 'term', allowNull: false }
}, {
  timestamps: false,
  underscored: true,
  tableName: tableName('term_relations')
})

Term.sync({ force: false })
TermMeta.sync({ force: false })
TermRelation.sync({ force: false })
