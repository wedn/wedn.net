import db from './db'

const { slug, username, key, mobile } = db.validate

/**
 * User Model
 * @type {Model}
 */
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
    allowNull: false,
    validate: { is: mobile },
    defaultValue: ''
  },
  status: {
    field: db.utils.fieldName('status'),
    type: db.Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'unactivated',
    comment: 'unactivated / mobile-unactivated / activated / forbidden'
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
  classMethods: {
    /**
     * 根据用户名获取用户对象
     * @param  {String}   username 用户名
     * @return {Instance}          用户对象
     */
    async getByUsername (username) {
      return User.findOne({ where: { username } })
    },

    /**
     * 根据用户邮箱获取用户对象
     * @param  {String}   email 用户邮箱
     * @return {Instance}       用户对象
     */
    async getByEmail (email) {
      return User.findOne({ where: { email } })
    },

    /**
     * 添加一个新用户
     * @param {String or Object} username   用户名（Required） or 用户对象
     * @param {String}           email      邮箱（Required）
     * @param {String}           password   密码（Required）
     * @param {String}           nickname   昵称（Optional）
     * @param {String}           slug       别名（Optional）
     * @param {String}           mobile     手机（Optional）
     * @param {String}           role       角色（Optional）
     * @param {String}           status     状态（Optional）
     * @return {Instance}                   新增的用户对象
     */
    async add (username, email, password, nickname, slug, mobile, role, status) {
      // ## 1. 参数处理
      let temp = {}
      if (typeof username === 'object') {
        // 以对象方式传入
        Object.assign(temp, username)
        temp.slug = temp.slug || temp.username
        temp.nickname = temp.nickname || temp.username
      } else {
        // 单个数据传入
        temp.username = username
        temp.email = email
        temp.password = password
        temp.slug = slug || username
        temp.nickname = nickname || username
        temp.mobile = mobile
        temp.role = role
        temp.status = status
      }
      // 创建这个元素
      return User.create(temp)
    }
  },
  instanceMethods: {}
})

/**
 * UserMeta Model
 * @type {Model}
 */
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
  tableName: db.utils.tableName('user_meta'),
  classMethods: {},
  instanceMethods: {}
})

User.sync({ force: false })
UserMeta.sync({ force: false })
