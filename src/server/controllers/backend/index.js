import Router from 'koa-router'

// Create router and set pathname starts with
export const router = new Router({ prefix: '/(wedn|wp-admin|ghost)' })

/**
 * GET /(wedn|wp-admin|ghost)/:path*
 */
router.get('admin-alias', '/:path*', ctx => {
  ctx.status = 301
  ctx.redirect(`/${Router.url('admin')}/${ctx.params.path || ''}`)
})
