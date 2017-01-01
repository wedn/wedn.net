import path from 'path'

import Router from 'koa-router'
import serve from 'koa-static'
import mount from 'koa-mount'

import admin from '../../../shared/wedn'

export const router = new Router({ prefix: `/${admin.base}` })

/**
 * 静态文件处理
 */
router.use(mount(`/${admin.base}`, serve(path.join(__dirname, '../../../client'))))

/**
 * ALL /admin/
 */
router.all('admin', '*', async ctx => {
  if (ctx.app.env === 'production') {
    await ctx.render('admin/index')
  } else {
    ctx.type = 'text/html'
    ctx.body = `<h1>Hello ${ctx.session.user.nickname}</h1>`
  }
})
