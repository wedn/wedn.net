import Router from 'koa-router'

// Create router and set pathname starts with
export const router = new Router({ prefix: '/admin' })

/**
 * GET /admin/
 */
router.get('admin', '*', async ctx => {
  // TODO:
  // ctx.body = '管理后台'
  await ctx.render('admin', { site_name: 'WEDN.NET' })
})
