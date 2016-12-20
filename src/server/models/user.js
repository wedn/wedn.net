import db from './db'

const { slug, username, key } = db.validate

export const User = db.define('user', {
  slug: {
    field: db.utils.fieldName('slug'),
    type: db.Sequelize.STRING(100),
    unique: true,
    allowNull: false,
    validate: { is: slug }
  },
  username: {
    field: db.utils.fieldName('username'),
    type: db.Sequelize.STRING(60),
    unique: true,
    allowNull: false,
    validate: { is: username }
  },
  password: {
    field: db.utils.fieldName('password'),
    type: db.Sequelize.STRING(60),
    allowNull: false
  },
  nickname: {
    field: db.utils.fieldName('nickname'),
    type: db.Sequelize.STRING(60),
    allowNull: false
  },
  email: {
    field: db.utils.fieldName('email'),
    type: db.Sequelize.STRING(100),
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  mobile: {
    field: db.utils.fieldName('mobile'),
    type: db.Sequelize.STRING(20),
    unique: true,
    allowNull: false,
    validate: { isNumeric: true }
  },
  status: {
    field: db.utils.fieldName('status'),
    type: db.Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'unactivated',
    comment: 'email-unactivated / mobile-unactivated / activated / forbidden'
  },
  role: {
    field: db.utils.fieldName('role'),
    type: db.Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'subscriber',
    comment: 'administrator / editor / author / contributor / subscriber'
  }
}, {
  underscored: true,
  tableName: db.utils.tableName('users'),
  classMethods: {},
  instanceMethods: {}
})

export const UserMeta = db.define('userMeta', {
  key: {
    field: db.utils.fieldName('key'),
    type: db.Sequelize.STRING(60),
    unique: 'user',
    allowNull: false,
    validate: { is: key }
  },
  value: {
    field: db.utils.fieldName('value'),
    type: db.Sequelize.TEXT('tiny'),
    allowNull: false,
    defaultValue: ''
  },
  userId: {
    field: db.utils.fieldName('user_id'),
    type: db.Sequelize.INTEGER,
    unique: 'user',
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: db.utils.tableName('user_meta')
})

User.sync({ force: false })
UserMeta.sync({ force: false })
