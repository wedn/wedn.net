/**
 * Wrap api action method
 */

const wrap = action => async ctx => {
  // prepare params
  let params = Object.assign({
    ip: ctx.ip,
    ips: ctx.ips,
    userAgent: ctx.get('user-agent')
  }, ctx.query, ctx.params)

  let body = Object.assign({}, ctx.req.files, ctx.request.body)

  if (!Object.keys(body).length) {
    body = params
    params = undefined
  }

  // invoke action
  const result = await action(body, params)
  if (result !== undefined) ctx.body = result
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
