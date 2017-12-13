/**
 * Pagination headers
 *
 * @see
 * - https://en.wikipedia.org/wiki/HATEOAS
 */

const url = require('url')
const debug = require('debug')('wedn:api:middleware:respond')

const setPaginationHeaders = ctx => {
  const { pagination } = ctx.state
  if (!pagination) return

  pagination.prev = pagination.page - 1
  pagination.next = pagination.page + 1
  pagination.pages = Math.ceil(pagination.total / pagination.limit)
  debug('pagination: %o', pagination)

  // get link for a page
  const getPageLink = page => {
    const urlObj = url.parse(ctx.href, true)
    urlObj.query.page = page
    delete urlObj.search
    return url.format(urlObj)
  }

  const links = []
  if (pagination.page !== 1) {
    links.push(`<${getPageLink(1)}>; rel=first`)
  }
  if (pagination.prev > 0) {
    links.push(`<${getPageLink(pagination.prev)}>; rel=prev`)
  }
  if (pagination.next <= pagination.pages) {
    links.push(`<${getPageLink(pagination.next)}>; rel=next`)
  }
  if (pagination.page !== pagination.pages) {
    links.push(`<${getPageLink(pagination.pages)}>; rel=last`)
  }

  links.length && ctx.set('Link', links.join(', '))
  ctx.set('X-Total-Count', pagination.total)
  ctx.set('X-Total-Limit', pagination.limit)
  ctx.set('X-Total-Pages', pagination.pages)
}

const setResponseBody = ctx => {
  if (ctx.body) return
  ctx.body = ctx.state.data
}

module.exports = () => async (ctx, next) => {
  await next()

  setPaginationHeaders(ctx)

  setResponseBody(ctx)
}
