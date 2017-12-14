/**
 * Parse query parameters to mongo query
 *
 * @see
 * - https://api.ghost.org/docs/limit
 */

const qs = require('querystring')

/**
 * Parse query options
 * @param {Object} query Query object
 */
const parseOptions = ({ page, limit, sort }) => {
  if (!page && !limit && !sort) return null

  const options = {}

  options.page = ~~page
  options.limit = ~~limit
  if (page || limit) {
    options.page = options.page < 1 ? 1 : options.page
    options.limit = options.limit < 1 ? 20 : options.limit
    options.skip = (options.page - 1) * options.limit
  }

  options.sort = qs.parse(sort || 'created_at', ',', ':')
  for (const prop in options.sort) {
    options.sort[prop] = options.sort[prop].trim() || 'desc'
    if (!['desc', 'asc'].includes(options.sort[prop])) {
      options.sort[prop] = 'desc'
    }
  }

  return options
}

/**
 * Parse query fields
 * @param {Object} query Query object
 */
const parseFields = ({ fields }) => {
  if (!fields || fields === 'all') return null
  return fields.split(',').map(i => i.trim())
}

/**
 * Parse query filter
 * @param {Object} query Query object
 */
const parseFilter = ({ filter }) => {
  if (!filter) return null

  const temp = qs.parse(filter, ',', ':')
  for (const prop in temp) {
    temp[prop] = temp[prop].trim()
    if (!temp[prop]) {
      delete temp[prop]
    }
  }
  return temp
}

/**
 * Parse query include
 * @param {Object} query Query object
 */
const parseInclude = ({ include }) => {
  if (!include || include === 'all') return null
  return include.split(',').map(i => i.trim())
}

const q2m = query => ({
  filter: parseFilter(query),
  fields: parseFields(query),
  options: parseOptions(query),
  include: parseInclude(query)
})

module.exports = () => async (ctx, next) => {
  ctx.q2m = q2m(ctx.query)
  await next()
}
