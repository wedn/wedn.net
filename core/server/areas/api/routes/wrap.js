/**
 * Wrap api action method
 *
 * @deprecated
 * @todo reorder parameters
 */

const debug = require('debug')('wedn:api:route:wrap')

/**
 * Utils functions
 */
const url = require('url')

// get link for a page
const getPageLink = (ctx, page) => {
  const urlObj = url.parse(ctx.href, true)
  urlObj.query.page = page
  delete urlObj.search
  return url.format(urlObj)
}

// prepare params
const bindParams = ctx => {
  const options = Object.assign({
    ip: ctx.ip,
    ips: ctx.ips,
    userAgent: ctx.get('user-agent'),
    currentUser: ctx.state.user,
    router: ctx.router
  }, ctx.query, ctx.params)

  const body = Object.assign({}, ctx.req.files, ctx.request.body)

  const params = []

  Object.keys(body).length && params.push(body)

  params.push(options)

  return params
}

// respond
const respond = (ctx, { status = 200, meta = null, data = null }) => {
  // // response status
  // ctx.status = status

  // response header
  if (meta) {
    // pagination
    const { page, total, limit } = meta
    const prev = page - 1
    const next = page + 1
    const pages = Math.ceil(total / limit)
    debug('pagination info: %o', { page, prev, next, pages, total, limit })

    // links
    // https://en.wikipedia.org/wiki/HATEOAS
    const links = []
    page !== 1 && links.push(`<${getPageLink(ctx, 1)}>, rel=first`)
    prev > 0 && links.push(`<${getPageLink(ctx, prev)}>, rel=prev`)
    next <= pages && links.push(`<${getPageLink(ctx, next)}>, rel=next`)
    page !== pages && links.push(`<${getPageLink(ctx, pages)}>, rel=last`)
    ctx.set('Link', links.join(', '))

    // pagination
    ctx.set('X-Total-Count', total)
    ctx.set('X-Total-Pages', pages)
  }

  // response body
  ctx.body = data
}

const wrap = action => async ctx => {
  // invoke action
  const result = await action(...bindParams(ctx))
  // respond
  respond(ctx, result)
}

module.exports = input => {
  if (typeof input === 'function') {
    return wrap(input)
  }

  const controller = {}
  for (const name in input) {
    controller[name] = wrap(input[name])
  }
  return controller
}
