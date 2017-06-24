import db from './db'

const { email, ip } = db.validate

/**
 * Comment Model
 * @type {Model}
 */
export default db.define('Comment', {
  author: {
    field: db.utils.fieldName('author'),
    type: db.Sequelize.STRING(60),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'comment author',
    validate: {}
  },
  email: {
    field: db.utils.fieldName('email'),
    type: db.Sequelize.STRING(100),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'comment email',
    validate: { email }
  },
  ip: {
    field: db.utils.fieldName('ip'),
    type: db.Sequelize.STRING(20),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'comment ip',
    validate: { ip }
  },
  content: {
    field: db.utils.fieldName('content'),
    type: db.Sequelize.STRING(2000),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'comment content',
    validate: {}
  },
  status: {
    field: db.utils.fieldName('status'),
    type: db.Sequelize.STRING(20),
    unique: false,
    allowNull: false,
    defaultValue: 'hold',
    comment: 'comment status: hold / approve / spam / trash',
    validate: {}
  },
  userAgent: {
    field: db.utils.fieldName('user_agent'),
    type: db.Sequelize.STRING(20),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'comment user agent',
    validate: {}
  },
  postId: {
    field: db.utils.fieldName('post_id'),
    type: db.Sequelize.INTEGER,
    unique: false,
    allowNull: true,
    defaultValue: null,
    comment: 'comment post id',
    validate: {}
  },
  userId: {
    field: db.utils.fieldName('user_id'),
    type: db.Sequelize.INTEGER,
    unique: false,
    allowNull: true,
    defaultValue: null,
    comment: 'comment user id',
    validate: {}
  },
  parentId: {
    field: db.utils.fieldName('parent_id'),
    type: db.Sequelize.INTEGER,
    unique: false,
    allowNull: true,
    defaultValue: null,
    comment: 'comment parent id',
    validate: {}
  }
}, db.utils.tableOptions({
  tableName: db.utils.tableName('comments'),
  classMethods: {},
  instanceMethods: {}
}))
