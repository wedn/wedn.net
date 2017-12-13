/**
 * Parse query params
 *
 * @see
 * - https://github.com/pbatey/query-to-mongo
 */

const debug = require('debug')('wedn:api:middleware:query')
const q2m = require('query-to-mongo')

module.exports = () => async (ctx, next) => {
  const query = q2m(ctx.querystring)
  debug('query params: %o', query)
  ctx.q2m = query
  await next()
}
