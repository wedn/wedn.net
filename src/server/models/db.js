import Sequelize from 'sequelize'

import config from '../config'
import { isKey, isSlug, isUsername, isEmail, isMobile } from '../libraries/validator'

const db = new Sequelize(config.database)

db.utils = {
  tableName: name => `w_${name}`,
  fieldName: name => name
}

// 自定义验证
db.validate = {
  isSlug: input => {
    if (!isSlug(input)) throw new Error(`Slug '${input}' format error`)
  },
  isUsername: input => {
    if (!isUsername(input)) throw new Error(`Username '${input}' format error`)
  },
  isPassword: input => {
    if (!input.length === 60) throw new Error(`Password '${input}' format error`)
  },
  isEmail: input => {
    if (!isEmail(input)) throw new Error(`Email '${input}' format error`)
  },
  isMobile: input => {
    if (!(input === '' || isMobile(input))) throw new Error(`Mobile '${input}' format error`)
  },
  isKey: input => {
    if (!isKey(input)) throw new Error(`Key '${input}' format error`)
  },
}

export default db
