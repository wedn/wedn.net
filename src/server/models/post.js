import { db, Sequelize, tableName, fieldName } from './db'

export const Post = db.define('post', {
  slug: { field: fieldName('slug'), type: Sequelize.STRING(100), unique: true, allowNull: false },
  title: { field: fieldName('title'), type: Sequelize.STRING(100), allowNull: false },
  excerpt: { field: fieldName('excerpt'), type: Sequelize.STRING(1000), allowNull: false },
  content: { field: fieldName('content'), type: Sequelize.TEXT, allowNull: false },
  type: { field: fieldName('type'), type: Sequelize.STRING(20), allowNull: false, defaultValue: 'article', comment: 'article / page / etc.' },
  status: { field: fieldName('status'), type: Sequelize.STRING(20), allowNull: false, defaultValue: 'draft', comment: 'draft / published / trash / etc.' },
  commentStatus: { field: fieldName('comment_status'), type: Sequelize.STRING(20), allowNull: false, defaultValue: 'open', comment: 'open / ...roles / close' },
  commentCount: { field: fieldName('comment_count'), type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  viewCount: { field: fieldName('view_count'), type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  userId: { field: fieldName('user_id'), type: Sequelize.INTEGER, allowNull: false },
  parentId: { field: fieldName('parent_id'), type: Sequelize.INTEGER, allowNull: false }
}, {
  underscored: true,
  tableName: tableName('posts')
})

export const PostMeta = db.define('postMeta', {
  key: { field: fieldName('key'), type: Sequelize.STRING(60), unique: 'post', allowNull: false },
  value: { field: fieldName('value'), type: Sequelize.TEXT('tiny'), allowNull: false, defaultValue: '' },
  postId: { field: fieldName('post_id'), type: Sequelize.INTEGER, unique: 'post', allowNull: false }
}, {
  timestamps: false,
  underscored: true,
  tableName: tableName('post_meta')
})

Post.sync({ force: false })
PostMeta.sync({ force: false })
