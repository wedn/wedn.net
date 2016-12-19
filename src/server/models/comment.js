import { db, Sequelize, tableName, fieldName } from './db'

export const Comment = db.define('comment', {
  author: { field: fieldName('author'), type: Sequelize.STRING(60), allowNull: false },
  email: { field: fieldName('email'), type: Sequelize.STRING(100), allowNull: false },
  ip: { field: fieldName('ip'), type: Sequelize.STRING(20), allowNull: false },
  content: { field: fieldName('content'), type: Sequelize.TEXT('tiny'), allowNull: false },
  status: { field: fieldName('status'), type: Sequelize.STRING(20), allowNull: false, defaultValue: 'hold', comment: 'hold / approve / spam / trash' },
  userAgent: { field: fieldName('user_agent'), type: Sequelize.STRING(20), allowNull: false },
  postId: { field: fieldName('post_id'), type: Sequelize.INTEGER, allowNull: false },
  userId: { field: fieldName('user_id'), type: Sequelize.INTEGER, allowNull: false },
  parentId: { field: fieldName('parent_id'), type: Sequelize.INTEGER, allowNull: false }
}, {
  underscored: true,
  tableName: tableName('comments')
})

export const CommentMeta = db.define('commentMeta', {
  key: { field: fieldName('key'), type: Sequelize.STRING(60), unique: 'comment', allowNull: false },
  value: { field: fieldName('value'), type: Sequelize.TEXT('tiny'), allowNull: false, defaultValue: '' },
  commentId: { field: fieldName('comment_id'), type: Sequelize.INTEGER, unique: 'comment', allowNull: false }
}, {
  timestamps: false,
  underscored: true,
  tableName: tableName('comment_meta')
})

Comment.sync({ force: false })
CommentMeta.sync({ force: false })

