import fs from 'fs'
import path from 'path'
import querystring from 'querystring'

import Router from 'koa-router'

export const router = new Router({ prefix: '/admin' })

/**
 * GET /admin/
 */
router.get('admin', '*', async ctx => {
  const { user } = ctx.session
  if (!user) {
    // 没有登录
    return ctx.redirect('/account/login?redirect=' + querystring.escape(ctx.url))
  }
  if (user.role !== 'administrator') {
    return ctx.redirect('/')
  }
  ctx.type = 'text/html'
  ctx.body = fs.createReadStream(path.join(__dirname, '../../../client/index.html'))
})
