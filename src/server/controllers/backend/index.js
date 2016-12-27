import Router from 'koa-router'
export const router = new Router({ prefix: '/(wedn|wp-admin|ghost)' })

/**
 * GET /(wedn|wp-admin|ghost)/:path*
 */
router.get('admin_alias', '/:path*', ctx => {
  console.log(111)
  ctx.status = 301
  ctx.redirect(`/admin/${ctx.params.path || ''}`)
})
