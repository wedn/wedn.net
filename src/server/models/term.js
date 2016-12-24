import db from './db'

/**
 * Term Model
 * @type {Model}
 */
export default db.define('Term', {
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
  tableName: db.utils.tableName('terms'),
  classMethods: {},
  instanceMethods: {}
})
