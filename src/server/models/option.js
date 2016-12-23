import db from './db'
import cache from '../libraries/cache'

const { key } = db.validate

/**
 * Option Model
 * @type {Model}
 */
export default db.define('Option', {
  key: {
    field: db.utils.fieldName('key'),
    type: db.Sequelize.STRING(60),
    unique: true,
    allowNull: false,
    defaultValue: '',
    comment: 'option key',
    validate: { key }
  },
  value: {
    field: db.utils.fieldName('value'),
    type: db.Sequelize.STRING(2000),
    unique: false,
    allowNull: false,
    defaultValue: '',
    comment: 'option value',
    validate: {}
  },
  enabled: {
    field: db.utils.fieldName('enabled'),
    type: db.Sequelize.BOOLEAN,
    unique: false,
    allowNull: false,
    defaultValue: false,
    comment: 'option enabled',
    validate: {}
  }
}, db.utils.tableOptions({
  createdAt: false,
  tableName: db.utils.tableName('options'),
  classMethods: {
    async load () {
      let cached = cache.get('option_cache')
      if (cached) return cached
      cached = await this.findAll({ where: { enabled: true } })
      cache.set('option_cache', cached)
      return cached
    }
  },
  instanceMethods: {},
}))
