import Router from 'koa-router'
import { User } from '../../models'
import { isPassword } from '../../libraries/validator'

export const router = new Router({ prefix: '/account' })

/**
 * GET /account/logout
 */
router.get('logout', '/logout', ctx => {
  // ## 1. 删除session中当前登录用户
  delete ctx.session.user
  // ## 2. 跳转到登录页
  ctx.redirect(router.url('login'))
})

/**
 * Common action
 */
router.use((ctx, next) => {
  if (ctx.session.user) {
    return ctx.redirect('/')
  }
  return next()
})

/**
 * GET /account/
 */
router.get('/', ctx => {
  ctx.status = 301
  ctx.redirect(router.url('login'))
})

/**
 * GET /account/login
 */
router.get('login', '/login', async ctx => {
  ctx.state.model = { username: '', password: '' }
  await ctx.render('account/login')
})

/**
 * POST /account/login
 * TODO: 错误提示消息问题
 */
router.post('login_post', '/login', async ctx => {
  // ## 0. 接收表单
  const { username, password } = ctx.request.body

  ctx.state.model = { username, password }

  // ## 1. 合法化校验
  if (!(username && password)) {
    ctx.state.error = 'Please complete the form! '
    return await ctx.render('account/login')
  }

  // 不需要校验用户名格式：有可能是邮箱或手机
  // // ### 1.1. 用户名格式是否正确
  // if (!isUsername(username)) {
  //   ctx.state.error = 'Username or Password error! '
  //   return await ctx.render('account/index')
  // }

  // ### 1.2. 密码格式是否正确
  if (!isPassword(password)) {
    ctx.state.error = 'Username or Password error! '
    return await ctx.render('account/login')
  }

  // ## 2. 持久化
  const user = await User.getByUnique(username)
  // ## 3. 客户端响应
  if (!user || !await user.comparePassword(password)) {
    ctx.state.error = 'Username or Password error! '
    return await ctx.render('account/login')
  }
  // 存在
  ctx.session.user = user
  ctx.redirect(ctx.query.redirect ? ctx.query.redirect : '/')
})

/**
 * GET /account/register
 */
router.get('register', '/register', async ctx => {
  ctx.state.model = { username: '', email: '', password: '' }
  await ctx.render('account/register')
})

/**
 * POST /account/register
 * TODO: 错误提示消息问题
 */
router.post('register_post', '/register', async ctx => {
  // ## 0. 接收表单
  const { username, email, password } = ctx.request.body

  ctx.state.model = { username, email, password }

  // ## 1. 合法化校验
  if (!(username && email && password)) {
    ctx.state.error = 'Please complete the form! '
    return await ctx.render('account/register')
  }

  try {
    // ## 2. 持久化
    const user = await User.add(username, email, password)
    // ### 2.1. Session
    ctx.session.user = user
    // 3. 响应客户端
    ctx.redirect('/')
  } catch (e) {
    ctx.state.error = e.message
    // 3. 响应客户端
    return await ctx.render('account/register')
  }
})
