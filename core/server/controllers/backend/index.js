import Router from 'koa-router'

// Create router and set pathname starts with
export const router = new Router({ prefix: '/(wedn|wp-admin|ghost)' })

/**
 * GET /
 */
router.get('admin-alias', '*', ctx => {
  ctx.status = 301
  ctx.redirect(Router.url('admin'))
})
