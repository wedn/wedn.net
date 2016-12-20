import db from './db'

export const Comment = db.define('comment', {
  author: { field: db.utils.fieldName('author'), type: db.Sequelize.STRING(60), allowNull: false },
  email: { field: db.utils.fieldName('email'), type: db.Sequelize.STRING(100), allowNull: false },
  ip: { field: db.utils.fieldName('ip'), type: db.Sequelize.STRING(20), allowNull: false },
  content: { field: db.utils.fieldName('content'), type: db.Sequelize.TEXT('tiny'), allowNull: false },
  status: { field: db.utils.fieldName('status'), type: db.Sequelize.STRING(20), allowNull: false, defaultValue: 'hold', comment: 'hold / approve / spam / trash' },
  userAgent: { field: db.utils.fieldName('user_agent'), type: db.Sequelize.STRING(20), allowNull: false },
  postId: { field: db.utils.fieldName('post_id'), type: db.Sequelize.INTEGER, allowNull: false },
  userId: { field: db.utils.fieldName('user_id'), type: db.Sequelize.INTEGER, allowNull: false },
  parentId: { field: db.utils.fieldName('parent_id'), type: db.Sequelize.INTEGER, allowNull: false }
}, {
  underscored: true,
  tableName: db.utils.tableName('comments')
})

export const CommentMeta = db.define('commentMeta', {
  key: { field: db.utils.fieldName('key'), type: db.Sequelize.STRING(60), unique: 'comment', allowNull: false },
  value: { field: db.utils.fieldName('value'), type: db.Sequelize.TEXT('tiny'), allowNull: false, defaultValue: '' },
  commentId: { field: db.utils.fieldName('comment_id'), type: db.Sequelize.INTEGER, unique: 'comment', allowNull: false }
}, {
  timestamps: false,
  tableName: db.utils.tableName('comment_meta')
})

Comment.sync({ force: false })
CommentMeta.sync({ force: false })

