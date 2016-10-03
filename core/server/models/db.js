import knex from 'knex'
import bookshelf from 'bookshelf'

import config from '../../../config'

const options = config.database

export default bookshelf(knex(options))
