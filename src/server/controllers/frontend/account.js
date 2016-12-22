import Router from 'koa-router'
import { User } from '../../models'

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
  ctx.state.title = 'Login'
  await ctx.render('account/index')
})

/**
 * POST /account/login
 */
router.post('login_post', '/login', async ctx => {
  ctx.body = ctx.request.body
})

/**
 * GET /account/register/
 */
router.get('register', '/register', async ctx => {
  ctx.state.title = 'Register'
  await ctx.render('account/index')
})

/**
 * POST /account/register
 */
router.post('register_post', '/register', async ctx => {
  // ## 0. 接收表单
  const { username, email, password } = ctx.request.body

  ctx.state.title = 'Register'

  // ## 1. 合法化校验
  if (!(username && email && password)) {
    ctx.state.message = 'Input'
    return await ctx.render('account/index')
  }

  // ### 1.1. 用户名是否存在
  if (await User.getByUsername(username)) {
    ctx.state.message = 'Username exist'
    return await ctx.render('account/index')
  }

  // ### 1.2. 邮箱是否存在
  if (await User.getByEmail(email)) {
    ctx.state.message = 'Email exist'
    return await ctx.render('account/index')
  }

  // ## 2. 持久化


  // 3. 响应客户端
  ctx.body = ctx.request.body
})

/**
 * GET /account/logout
 */
router.get('logout', '/logout', async ctx => {
  await ctx.render('account/index')
})
