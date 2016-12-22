import db from './db'

/**
 * Post Model
 * @type {Model}
 */
export const Post = db.define('post', {
  slug: {
    field: db.utils.fieldName('slug'),
    type: db.Sequelize.STRING(100),
    unique: true,
    allowNull: false
  },
  title: {
    field: db.utils.fieldName('title'),
    type: db.Sequelize.STRING(100),
    allowNull: false
  },
  excerpt: {
    field: db.utils.fieldName('excerpt'),
    type: db.Sequelize.STRING(1000),
    allowNull: false
  },
  content: {
    field: db.utils.fieldName('content'),
    type: db.Sequelize.TEXT
  },
  type: {
    field: db.utils.fieldName('type'),
    type: db.Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'article',
    comment: 'article / page / etc.'
  },
  status: {
    field: db.utils.fieldName('status'),
    type: db.Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'draft',
    comment: 'draft / published / trash / etc.'
  },
  commentStatus: {
    field: db.utils.fieldName('comment_status'),
    type: db.Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'open',
    comment: 'open / ...roles / close'
  },
  commentCount: {
    field: db.utils.fieldName('comment_count'),
    type: db.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  viewCount: {
    field: db.utils.fieldName('view_count'),
    type: db.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
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
}, {
  underscored: true,
  tableName: db.utils.tableName('posts'),
  classMethods: {},
  instanceMethods: {}
})

/**
 * PostMeta Model
 * @type {Model}
 */
export const PostMeta = db.define('postMeta', {
  key: {
    field: db.utils.fieldName('key'),
    type: db.Sequelize.STRING(60),
    unique: 'post',
    allowNull: false
  },
  value: {
    field: db.utils.fieldName('value'),
    type: db.Sequelize.STRING(2000),
    allowNull: false,
    defaultValue: ''
  },
  postId: {
    field: db.utils.fieldName('post_id'),
    type: db.Sequelize.INTEGER,
    unique: 'post',
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: db.utils.tableName('post_meta'),
  classMethods: {},
  instanceMethods: {}
})

Post.sync({ force: false })
PostMeta.sync({ force: false })
