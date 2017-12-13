/**
 * Parse query parameters
 *
 * @see
 * - https://api.ghost.org/docs/limit
 */

const qs = require('querystring')
const debug = require('debug')('wedn:api:middleware:parameters')

const parseOptions = ({ page = 1, limit = 20, sort = 'created_at' }) => {
  page = parseInt(page)
  page = page < 1 ? 1 : page

  limit = parseInt(limit)
  limit = limit < 1 ? 20 : limit

  skip = (page - 1) * limit

  sort = qs.parse(sort, ',', ':')
  for (const prop in sort) {
    sort[prop] = sort[prop].trim() || 'desc'
    if (!['desc', 'asc'].includes(sort[prop])) {
      sort[prop] = 'desc'
    }
  }

  return { page, skip, limit, sort }
}

const parseFields = ({ fields }) => {
  if (!fields || fields === 'all') return null
  return fields.split(',').map(i => i.trim())
}

const parseFilter = ({ filter }) => {
  const temp = qs.parse(filter, ',', ':')
  for (const prop in temp) {
    temp[prop] = temp[prop].trim()
    if (!temp[prop]) {
      delete temp[prop]
    }
  }
  return temp
}

const parseInclude = ({ include }) => {
  if (!include || include === 'all') return null
  return include.split(',').map(i => i.trim())
}

module.exports = () => async (ctx, next) => {
  const params = {}

  params.options = parseOptions(ctx.query)
  params.fields = parseFields(ctx.query)
  params.filter = parseFilter(ctx.query)
  params.include = parseInclude(ctx.query)

  // { filter, fields, options, include }
  debug('api query params %o', params)

  ctx.parameters = params

  await next()
}
