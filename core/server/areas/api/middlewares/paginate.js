/**
 * Set pagination info
 */

const url = require('url')
const debug = require('debug')('wedn:api:utils:paginate')

/**
 * Get link for target page
 * @param {String} current current page link
 * @param {Number} page
 */
const link = (current, page) => {
  const urlObj = url.parse(current, true)
  urlObj.query.page = page
  delete urlObj.search // !!!
  return url.format(urlObj)
}

/**
 * Compute pagination
 * @param {Object} pagination pagination
 */
const compute = (pagination) => {
  // total pages
  pagination.pages = ~~Math.ceil(pagination.total / pagination.limit)

  // prev & next
  pagination.prev = pagination.page - 1 > 0 ? pagination.page - 1 : null
  pagination.next = pagination.page + 1 <= pagination.pages ? pagination.page + 1 : null

  // { page, pages, limit, total, prev, next }
  debug('api response pagination: %o', pagination)

  return pagination
}

module.exports = () => async (ctx, next) => {
  ctx.pagination = {}

  if (ctx.q2m.options) {
    ctx.pagination.page = ctx.q2m.options.page
    ctx.pagination.limit = ctx.q2m.options.limit
  }

  await next()

  const pagination = compute(ctx.pagination)

  ctx.set('X-Limit-Count', pagination.limit)
  ctx.set('X-Total-Count', pagination.total)
  ctx.set('X-Current-Page', pagination.page)
  ctx.set('X-Total-Pages', pagination.pages)

  // link header
  const links = []
  if (pagination.page !== 1) {
    links.push(`<${link(ctx.href, 1)}>; rel=first`)
  }
  if (pagination.prev) {
    links.push(`<${link(ctx.href, pagination.prev)}>; rel=prev`)
  }
  if (pagination.next) {
    links.push(`<${link(ctx.href, pagination.next)}>; rel=next`)
  }
  if (pagination.page !== pagination.pages) {
    links.push(`<${link(ctx.href, pagination.pages)}>; rel=last`)
  }

  links.length && ctx.set('Link', links.join(', '))
}
