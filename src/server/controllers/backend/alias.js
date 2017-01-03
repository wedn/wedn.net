import Router from 'koa-router'

import admin from '../../../shared/wedn'

export const router = new Router({ prefix: admin.alias })

/**
 * ALL /${admin.base}/:path*
 */
router.all('/:path*', ctx => {
  ctx.status = 301
  ctx.redirect(`${admin.base}${ctx.params.path || ''}`)
})
