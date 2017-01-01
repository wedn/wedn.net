import Router from 'koa-router'

import authorize from '../common/authorize'
import admin from '../../../shared/wedn'

export const router = new Router({ prefix: `/(${admin.alias})` })

/**
 * 权限验证
 */
router.use(authorize('administrator'))

/**
 * ALL /${admin.base}/:path*
 */
router.all('admin_alias', '/:path*', ctx => {
  ctx.status = 301
  ctx.redirect(`/${admin.base}/${ctx.params.path || ''}`)
})
