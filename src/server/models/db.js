import Sequelize from 'sequelize'

import config from '../config'
import { isKey, isSlug, isUsername, isNickname, isEmail, isMobile } from '../libraries/validator'

const db = new Sequelize(config.database)

const defaultTableOptions = {
  timestamps: true,
  createdAt: 'created',
  updatedAt: 'updated',
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  classMethods: {},
  instanceMethods: {}
}

// 工具函数
db.utils = {
  tableName: name => `w_${name}`,
  fieldName: name => name,
  tableOptions: options => Object.assign({}, defaultTableOptions, options)
}

// 自定义验证
db.validate = {
  key: input => {
    if (!isKey(input)) throw new Error(`Key '${input}' format error`)
  },
  slug: input => {
    if (!isSlug(input)) throw new Error(`Slug '${input}' format error`)
  },
  username: input => {
    if (!isUsername(input)) throw new Error(`Username '${input}' format error`)
  },
  password: input => {
    if (input.length !== 60) throw new Error(`Password '${input}' format error`)
  },
  nickname: input => {
    if (!isNickname(input)) throw new Error(`Nickname '${input}' format error`)
  },
  email: input => {
    if (!isEmail(input)) throw new Error(`Email '${input}' format error`)
  },
  mobile: input => {
    if (!isMobile(input)) throw new Error(`Mobile '${input}' format error`)
  }
}

export default db
