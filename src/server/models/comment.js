import db from './db'

/**
 * Comment Model
 * @type {Model}
 */
export default db.define('Comment', {
  author: {
    field: db.utils.fieldName('author'),
    type: db.Sequelize.STRING(60),
    allowNull: false
  },
  email: {
    field: db.utils.fieldName('email'),
    type: db.Sequelize.STRING(100),
    allowNull: false
  },
  ip: {
    field: db.utils.fieldName('ip'),
    type: db.Sequelize.STRING(20),
    allowNull: false
  },
  content: {
    field: db.utils.fieldName('content'),
    type: db.Sequelize.STRING(2000),
    allowNull: false
  },
  status: {
    field: db.utils.fieldName('status'),
    type: db.Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'hold',
    comment: 'hold / approve / spam / trash'
  },
  userAgent: {
    field: db.utils.fieldName('user_agent'),
    type: db.Sequelize.STRING(20),
    allowNull: false
  },
  postId: {
    field: db.utils.fieldName('post_id'),
    type: db.Sequelize.INTEGER,
    allowNull: false
  },
  userId: {
    field: db.utils.fieldName('user_id'),
    type: db.Sequelize.INTEGER,
    allowNull: false
  },
  parentId: {
    field: db.utils.fieldName('parent_id'),
    type: db.Sequelize.INTEGER,
    allowNull: false
  }
}, db.utils.tableOptions({
  tableName: db.utils.tableName('comments'),
  classMethods: {},
  instanceMethods: {}
}))
