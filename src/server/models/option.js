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
    defaultValue: true,
    comment: 'option enabled',
    validate: {}
  }
}, db.utils.tableOptions({
  createdAt: false,
  tableName: db.utils.tableName('options'),
  classMethods: {
    async load () {
      let cached = await cache.get('option_cache')
      if (cached) return cached
      const options = await this.findAll({ where: { enabled: true } })
      cached = {}
      options.forEach(item => { cached[item.key] = item.value })
      Object.keys(cached).length && await cache.set('option_cache', cached)
      return cached
    }
  },
  instanceMethods: {}
}))
