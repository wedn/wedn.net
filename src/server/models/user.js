import { db, Sequelize, tableName, fieldName } from './db'

export const User = db.define('user', {
  slug: { field: fieldName('slug'), type: Sequelize.STRING(100), unique: true, allowNull: false },
  username: { field: fieldName('username'), type: Sequelize.STRING(60), unique: true, allowNull: false },
  password: { field: fieldName('password'), type: Sequelize.STRING(60), allowNull: false },
  nickname: { field: fieldName('nickname'), type: Sequelize.STRING(60), allowNull: false },
  email: { field: fieldName('email'), type: Sequelize.STRING(100), unique: true, allowNull: false },
  mobile: { field: fieldName('mobile'), type: Sequelize.STRING(20), unique: true, allowNull: false, defaultValue: 'unactivated', comment: 'email-unactivated / mobile-unactivated / activated / forbidden' },
  status: { field: fieldName('status'), type: Sequelize.STRING(20), allowNull: false, defaultValue: 'subscriber', comment: 'administrator / editor / author / contributor / subscriber' },
  role: { field: fieldName('role'), type: Sequelize.STRING(20), allowNull: false }
}, {
  underscored: true,
  tableName: tableName('users')
})

export const UserMeta = db.define('userMeta', {
  key: { field: fieldName('key'), type: Sequelize.STRING(60), unique: 'user', allowNull: false },
  value: { field: fieldName('value'), type: Sequelize.TEXT('tiny'), allowNull: false, defaultValue: '' },
  userId: { field: fieldName('user_id'), type: Sequelize.INTEGER, unique: 'user', allowNull: false }
}, {
  timestamps: false,
  underscored: true,
  tableName: tableName('user_meta')
})

User.sync({ force: false })
UserMeta.sync({ force: false })
