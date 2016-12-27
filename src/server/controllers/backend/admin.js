import fs from 'fs'
import path from 'path'
import querystring from 'querystring'

import Router from 'koa-router'

import admin from '../../../shared/wedn'

export const router = new Router({ prefix: `/${admin.base}` })

/**
 * ALL /admin/
 */
router.all('admin', '*', async ctx => {
  const { user } = ctx.session
  if (!user) {
    // 没有登录
    return ctx.redirect('/account/login?redirect=' + querystring.escape(ctx.url))
  }
  if (user.role !== 'administrator') {
    return ctx.redirect('/')
  }
  ctx.compress = false
  ctx.type = 'text/html'
  if (ctx.app.env === 'production') {
    ctx.body = fs.createReadStream(path.join(__dirname, '../../../client/index.html'))
  } else {
    ctx.body = `<h1>Hello ${user.nickname}</h1>`
  }
})
