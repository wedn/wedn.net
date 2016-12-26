import db from './db'
import validator from '../libraries/validator'
import { hash, compare } from '../libraries/encryptor'

const { slug, username, password, nickname, email, mobile } = db.validate

/**
 * User Model
 * @type {Model}
 */
export default db.define('User', {
  slug: {
    field: db.utils.fieldName('slug'),
    type: db.Sequelize.STRING(160),
    unique: true,
    allowNull: false,
    defaultValue: '',
    comment: 'user slug',
    validate: { slug }
  },
  username: {
    field: db.utils.fieldName('username'),
    type: db.Sequelize.STRING(100),
    unique: true,
    allowNull: false,
    defaultValue: '',
    comment: 'user username',
    validate: { username }
  },
  password: {
    field: db.utils.fieldName('password'),
    type: db.Sequelize.STRING(100),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'user password',
    validate: { password }
  },
  nickname: {
    field: db.utils.fieldName('nickname'),
    type: db.Sequelize.STRING(100),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'user nickname',
    validate: { nickname }
  },
  email: {
    field: db.utils.fieldName('email'),
    type: db.Sequelize.STRING(160),
    unique: true,
    allowNull: false,
    defaultValue: '',
    comment: 'user email',
    validate: { email }
  },
  mobile: {
    field: db.utils.fieldName('mobile'),
    type: db.Sequelize.STRING(20),
    unique: true,
    allowNull: true,
    defaultValue: null,
    comment: 'user mobile',
    validate: { mobile }
  },
  status: {
    field: db.utils.fieldName('status'),
    type: db.Sequelize.STRING(20),
    unique: false,
    allowNull: false,
    defaultValue: 'unactivated',
    comment: 'user status: unactivated / mobile-unactivated / activated / forbidden',
    validate: {}
  },
  role: {
    field: db.utils.fieldName('role'),
    type: db.Sequelize.STRING(20),
    unique: false,
    allowNull: false,
    defaultValue: 'subscriber',
    comment: 'user role: administrator / editor / author / contributor / subscriber',
    validate: {}
  }
}, db.utils.tableOptions({
  tableName: db.utils.tableName('users'),
  classMethods: {
    /**
     * 根据别名获取用户对象
     * @param  {String}   slug  别名
     * @return {Instance}       用户对象
     */
    async getBySlug (slug) {
      return this.findOne({ where: { slug } })
    },

    /**
     * 根据用户名获取用户对象
     * @param  {String}   username 用户名
     * @return {Instance}          用户对象
     */
    async getByUsername (username) {
      return this.findOne({ where: { username } })
    },

    /**
     * 根据用户邮箱获取用户对象
     * @param  {String}   email 用户邮箱
     * @return {Instance}       用户对象
     */
    async getByEmail (email) {
      return this.findOne({ where: { email } })
    },

    /**
     * 根据用户手机获取用户对象
     * @param  {String}   mobile 用户手机
     * @return {Instance}       用户对象
     */
    async getByMobile (mobile) {
      return this.findOne({ where: { mobile } })
    },

    /**
     * 根据用户名或用户邮箱或手机获取用户对象
     * @param  {String}   unique    用户名或用户邮箱或手机
     * @return {Instance}           用户对象
     */
    async getByUnique (unique) {
      const getMethod = validator.isEmail(unique)
        ? 'getByEmail'
        : validator.isMobile(unique)
        ? 'getByMobile'
        : 'getByUsername'
      return this[getMethod](unique)
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

      // 单独校验加密前密码的长度
      if (!validator.isPassword(temp.password)) {
        // 密码格式不正确
        // throw new db.ValidationError(`Password '${temp.password}' format error!`)
        throw new db.ValidationError('Validation error: Password format error!')
      }

      // 密码加密
      temp.password = await hash(temp.password)

      // ## 4. 创建这个对象到数据库
      // TODO: 异常抛出信息问题（消息）
      return this.create(temp).catch(e => {
        if (!(e instanceof db.UniqueConstraintError)) throw e
        throw new db.ValidationError(`${e.message}: ${e.errors[0].message}`)
      })
    }
  },
  instanceMethods: {
    /**
     * 用当前用户对象的加密密码与一个明文密码比对是否匹配
     * @param  {String}  password 明文密码
     * @return {Boolean}          是否匹配
     */
    async comparePassword (password) {
      return compare(password, this.password)
    }
  }
}))

//
//
//
//
//
// ===================== 以下为尝试代码（参考） =====================

// Sequelize可以简单一点
// /**
//  * 添加一个新用户
//  * @param {String or Object} username   用户名（Required） or 用户对象
//  * @param {String}           email      邮箱（Required）
//  * @param {String}           password   密码（Required）
//  * @param {String}           nickname   昵称（Optional）
//  * @param {String}           slug       别名（Optional）
//  * @param {String}           mobile     手机（Optional）
//  * @param {String}           role       角色（Optional）
//  * @param {String}           status     状态（Optional）
//  * @return {Instance}                   新增的用户对象
//  */
// async add (username, email, password, nickname, slug, mobile, role, status) {
//   // ## 1. 参数处理
//   let temp = {}
//   if (typeof username === 'object') {
//     // 以对象方式传入
//     Object.assign(temp, username)
//     temp.slug = temp.slug || temp.username
//     temp.nickname = temp.nickname || temp.username
//   } else {
//     // 单个数据传入
//     temp.username = username
//     temp.email = email
//     temp.password = password
//     temp.slug = slug || username
//     temp.nickname = nickname || username
//     temp.mobile = mobile
//     temp.role = role
//     temp.status = status
//   }

//   // =============== 借助模型校验 ===============

//   // 单独校验加密前密码的长度
//   if (!validator.isPassword(temp.password)) {
//     // 密码格式不正确
//     throw new Error(`Password '${temp.password}' format error!`)
//   }

//   // 密码加密
//   temp.password = await hash(temp.password)

//   // ## 2. 校验
//   // ### 2.1. 构建一个新对象
//   const user = User.build(temp)

//   // ### 2.2. 格式校验
//   const err = await user.validate()
//   if (err) throw err

//   // // ## 3. 保存这个对象到数据库
//   // try {
//   //   await user.save()
//   //   return user
//   // } catch (e) {
//   //   if (!e.errors) throw e
//   //   throw new Error(`${e.message}: ${e.errors[0].message}`)
//   // }

//   // ### 2.3. 用户名是否存在
//   if (await this.getByUsername(user.username)) {
//     // 用户名存在
//     throw new Error(`Username '${user.username}' already exists!`)
//   }

//   // ### 2.3. 用户邮箱是否存在
//   if (await this.getByEmail(user.email)) {
//     // 用户邮箱存在
//     throw new Error(`Email '${user.email}' already exists!`)
//   }

//   // ### 2.4. 用户别名是否存在
//   if (await this.getBySlug(user.slug)) {
//     // 用户别名存在
//     throw new Error(`Slug '${user.slug}' already exists!`)
//   }

//   // ### 2.5. 用户手机是否存在
//   if (user.mobile && await this.getByMobile(user.mobile)) {
//     // 用户手机存在
//     throw new Error(`Mobile '${user.mobile}' already exists!`)
//   }

//   // ## 3. 保存这个对象到数据库
//   return user.save()

//   // =============== 以下为手动校验操作 ===============

//   // // ## 2. 校验
//   // if (!validator.isUsername(temp.username)) {
//   //   // 用户名格式不正确
//   //   throw new Error('Error: Username format error!')
//   // }

//   // if (!validator.isEmail(temp.email)) {
//   //   // 邮箱格式不正确
//   //   throw new Error('Error: Email format error!')
//   // }

//   // if (!validator.isPassword(temp.password)) {
//   //   // 密码格式不正确
//   //   throw new Error('Error: Password format error!')
//   // }

//   // if (await this.getByUsername(temp.username)) {
//   //   // 用户名存在
//   //   throw new Error('Error: Username already exists!')
//   // }

//   // if (await this.getByEmail(temp.email)) {
//   //   // 邮箱存在
//   //   throw new Error('Error: Email already exists!')
//   // }

//   // // ## 3. 密码加密
//   // temp.password = await hash(temp.password)

//   // // ## 4. 创建这个对象到数据库
//   // return this.create(temp)
// }
