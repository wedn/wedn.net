import db from './db'

/**
 * Term Model
 * @type {Model}
 */
export const Term = db.define('term', {
  slug: {
    field: db.utils.fieldName('slug'),
    type: db.Sequelize.STRING(100),
    unique: 'term',
    allowNull: false
  },
  name: {
    field: db.utils.fieldName('name'),
    type: db.Sequelize.STRING(100),
    allowNull: false
  },
  taxonomy: {
    field: db.utils.fieldName('taxonomy'),
    type: db.Sequelize.STRING(20),
    unique: 'term',
    allowNull: false
  },
  description: {
    field: db.utils.fieldName('description'),
    type: db.Sequelize.STRING(500),
    allowNull: false
  },
  count: {
    field: db.utils.fieldName('count'),
    type: db.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  parentId: {
    field: db.utils.fieldName('parent_id'),
    type: db.Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true,
  tableName: db.utils.tableName('terms'),
  classMethods: {},
  instanceMethods: {}
})

/**
 * TermMeta Model
 * @type {Model}
 */
export const TermMeta = db.define('termMeta', {
  key: {
    field: db.utils.fieldName('key'),
    type: db.Sequelize.STRING(60),
    unique: 'term',
    allowNull: false
  },
  value: {
    field: db.utils.fieldName('value'),
    type: db.Sequelize.STRING(2000),
    allowNull: false,
    defaultValue: ''
  },
  termId: {
    field: db.utils.fieldName('term_id'),
    type: db.Sequelize.INTEGER,
    unique: 'term',
    allowNull: false
  }
}, {
  timestamps: false,
  underscored: true,
  tableName: db.utils.tableName('term_meta'),
  classMethods: {},
  instanceMethods: {}
})

/**
 * TermRelation Model
 * @type {Model}
 */
export const TermRelation = db.define('termRelation', {
  postId: {
    field: db.utils.fieldName('post_id'),
    type: db.Sequelize.INTEGER,
    unique: 'term',
    allowNull: false
  },
  termId: {
    field: db.utils.fieldName('term_id'),
    type: db.Sequelize.INTEGER,
    unique: 'term',
    allowNull: false
  }
}, {
  timestamps: false,
  underscored: true,
  tableName: db.utils.tableName('term_relations'),
  classMethods: {},
  instanceMethods: {}
})
