import Knex from 'knex'
import Bookshelf from 'bookshelf'
import config from '../../../config'

const knex = new Knex(config)

const tables = require('./schema')

tables.forEach(t => knex.schema.hasTable(t.name).then(exists => exists || knex.schema.createTable(t.name, table => {
  t.columns.forEach(c => {
    const column = table[c.type](c.name, c.length)
    c.primary && column.primary()
    c.nullable || column.notNullable()
    c.unique && column.unique()
    c.default && column.defaultTo(c.default)
    c.references && column.references(c.references)
    c.comment && column.comment(c.comment)
  })
  t.index && table.index(t.index)
  t.unique && table.unique(t.unique)
  t.comment && table.comment(t.comment)
})))

export default new Bookshelf(knex)
