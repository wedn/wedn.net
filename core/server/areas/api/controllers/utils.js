/**
 * Request params
 *
 * @see
 * - https://github.com/diegohaz/querymen
 * - https://www.npmjs.com/package/api-query-params
 * - https://github.com/loris/api-query-params
 * - https://github.com/alxolr/filter-query
 * - https://www.npmjs.com/package/coercion
 * - https://www.reddit.com/r/node/comments/62f6ef/building_a_mongodb_mongoose_query_directly_from/
 * - https://github.com/macalinao/preston/blob/master/lib/query.js
 *
 * - https://github.com/TryGhost/Ghost/issues/5604
 * - https://github.com/TryGhost/GQL
 * - http://zaa.ch/jison/docs/
 * - http://nuysoft.com/bak/jison-docs-cn.html
 * - https://github.com/pbatey/query-to-mongo
 */
const querystring = require('querystring')
const debug = require('debug')('wedn:api:controller:utils')

exports.getParams = (options, allowedFields, allowedInclude) => {
  const { page = 1, limit = 20, sort = 'created_at', fields, include, filter } = options

  const params = {}

  params.page = parseInt(page) || 1
  params.limit = parseInt(limit) || 20
  params.skip = (params.page - 1) * params.limit

  params.sort = querystring.parse(sort, ',', ':')
  for (const prop in params.sort) {
    params.sort[prop] = params.sort[prop].trim() || 'desc'
    if (!['desc', 'asc'].includes(params.sort[prop])) {
      params.sort[prop] = 'desc'
    }
  }

  if (!fields || fields === 'all') {
    params.fields = allowedFields
  } else {
    params.fields = fields.split(',').map(i => i.trim()).filter(i => allowedFields.includes(i))
  }

  if (include) {
    params.include = include.split(',').map(i => i.trim()).filter(i => allowedInclude.includes(i))
  } else {
    params.include = []
  }

  params.filter = querystring.parse(filter, ',', ':')
  for (const prop in params.filter) {
    params.filter[prop] = params.filter[prop].trim()
  }

  debug('api params %o', params)

  return params
}

// https://github.com/loris/api-query-params/blob/master/src/index.js
