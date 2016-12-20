import Router from 'koa-router'

export const router = new Router({ prefix: '/account' })

/**
 * GET /account/
 */
router.get('/', ctx => {
  ctx.status = 301
  ctx.redirect(router.url('login'))
})

/**
 * GET /account/login/
 */
router.get('login', '/login', async ctx => {
  await ctx.render('account/index', { title: 'Login'  })
})

/**
 * POST /account/login
 */
router.post('login', '/login', async ctx => {
  ctx.body = ctx.request.body
})

/**
 * GET /account/register/
 */
router.get('register', '/register', async ctx => {
  await ctx.render('account/index', { title: 'Register', isRegister: true })
})

/**
 * GET /account/logout/
 */
router.get('logout', '/logout', async ctx => {
  await ctx.render('account/index')
})
