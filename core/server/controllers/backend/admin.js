import Router from 'koa-router'

// Create router and set pathname starts with
export const router = new Router({ prefix: '/admin' })

/**
 * GET /admin/
 */
router.get('admin', '/*', ctx => {
  // TODO:
  ctx.body = '管理后台'
})
