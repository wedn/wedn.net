/**
 * 账户中心模块控制器
 * https://github.com/crypto-utils/keygrip
 */
import querystring from 'querystring'
import Router from 'koa-router'
import uuid from 'uuid'

import { User } from '../../models'
import validator from '../../libraries/validator'
import encryptor from '../../libraries/encryptor'

export const router = new Router({ prefix: '/account' })

/**
 * GET /account/logout
 */
router.get('logout', '/logout', async ctx => {
  // ## 1. 删除session中当前登录用户
  delete ctx.session.user
  // ## 2. 跳转到登录页
  ctx.redirect(router.url('login'))
})

/**
 * GET /account/activate/:token
 */
router.get('activate', '/activate/:token', async ctx => {
  if (!ctx.session.user) {
    // 没有登录
    return ctx.redirect('/account/login?redirect=' + querystring.escape(ctx.url))
  }
  let { token } = ctx.params
  try {
    token = encryptor.decrypt(token)
    const activateToken = await User.Meta.findOne({ where: { key: 'activate_token', value: token } })
    if (!activateToken) return ctx.throw(404)
    const user = await activateToken.getUser()
    if (!user || user.id !== ctx.session.user.id) return ctx.throw(404)
    user.status = 'activated'
    await user.save()
    await activateToken.destroy()
    ctx.session.user = user
    await ctx.redirect('/')
  } catch (e) {
    return ctx.throw(404)
  }
})

/**
 * Common action
 */
router.use(async (ctx, next) => {
  if (ctx.session.user) {
    return ctx.redirect('/')
  }
  return next()
})

/**
 * GET /account/
 */
router.get('alias', '/', async ctx => {
  ctx.status = 301
  ctx.redirect(router.url('login'))
})

/**
 * GET /account/login
 */
router.get('login', '/login', async ctx => {
  // ctx.state.model = { username: '', password: '' }
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
    ctx.state.error = 'Please complete the form!'
    return await ctx.render('account/login')
  }

  // 不需要校验用户名格式：有可能是邮箱或手机
  // // ### 1.1. 用户名格式是否正确
  // if (!validator.isUsername(username)) {
  //   ctx.state.error = 'Username or Password error!'
  //   return await ctx.render('account/index')
  // }

  // ### 1.2. 密码格式是否正确
  if (!validator.isPassword(password)) {
    ctx.state.error = 'Username or Password error!'
    return await ctx.render('account/login')
  }

  // ## 2. 持久化
  const user = await User.getByUnique(username)
  // ## 3. 客户端响应
  if (!user || !await user.comparePassword(password)) {
    ctx.state.error = 'Username or Password error!'
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
  // ctx.state.model = { username: '', email: '', password: '' }
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
    ctx.state.error = 'Please complete the form!'
    return await ctx.render('account/register')
  }

  try {
    // ## 2. 持久化
    const user = await User.add(username, email, password)
    // ### 2.0. 激活
    const activateToken = await User.Meta.create({
      key: 'activate_token',
      value: uuid()
    })
    user.addMeta(activateToken)
    const mailContent = await ctx.render('shared/mail/activate', {
      activate_url: `account/activate/${encryptor.encrypt(activateToken.value)}`
    }, false)
    // TODO: 异常处理
    await ctx.sendMail(`Activate Account « ${ctx.options.site_name}`, mailContent, `"${user.nickname}" <${user.email}>`)
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

/**
 * GET /account/reset
 */
router.get('reset', '/reset', async ctx => {
  ctx.state.send = true
  await ctx.render('account/reset')
})

/**
 * POST /account/reset
 */
router.post('reset_post', '/reset', async ctx => {
  // ## 0. 接收表单
  const { username } = ctx.request.body
  ctx.state.model = { username }

  if (!validator.isEmail(username)) {
    ctx.state.error = 'Email not exist!'
    ctx.state.send = true
    return await ctx.render('account/reset')
  }

  const user = await User.getByEmail(username)
  if (!user) {
    ctx.state.error = 'Email not exist!'
    ctx.state.send = true
    return await ctx.render('account/reset')
  }

  const [resetToken, created] = await User.Meta.findOrCreate({
    where: { key: 'password_reset_token' },
    defaults: {
      key: 'password_reset_token',
      value: uuid()
    }
  })

  if (created) {
    user.addMeta(resetToken)
  } else {
    resetToken.value = uuid()
    resetToken.save()
  }

  const mailContent = await ctx.render('shared/mail/reset-password', {
    reset_url: `account/reset/${encryptor.encrypt(resetToken.value)}`
  }, false)

  try {
    await ctx.sendMail(`Reset Password « ${ctx.options.site_name}`, mailContent, `"${user.nickname}" <${user.email}>`)
    ctx.state.message = 'Please check your email for instructions.'
  } catch (e) {
    ctx.state.error = e.message
  }
  ctx.state.send = true
  await ctx.render('account/reset')
})

/**
 * GET /account/reset/:token
 */
router.get('reset_token', '/reset/:token', async ctx => {
  let { token } = ctx.params
  try {
    token = encryptor.decrypt(token)
    const resetToken = await User.Meta.findOne({ where: { key: 'password_reset_token', value: token } })
    if (!resetToken) return ctx.throw(404)
    await ctx.render('account/reset')
  } catch (e) {
    return ctx.throw(404)
  }
})

/**
 * POST /account/reset/:token
 */
router.post('reset_token_post', '/reset/:token', async ctx => {
  let { token } = ctx.params
  const { password, confirm } = ctx.request.body
  try {
    token = encryptor.decrypt(token)
    if (password !== confirm) {
      ctx.state.error = 'Confirm password!'
      return await ctx.render('account/reset')
    }
    if (!validator.isPassword(password)) {
      ctx.state.error = 'Password format error!'
      return await ctx.render('account/reset')
    }
    // 根据token找到用户对象
    const resetToken = await User.Meta.findOne({ where: { key: 'password_reset_token', value: token } })
    if (!resetToken) return ctx.throw(404)
    const user = await resetToken.getUser()
    if (!user) return ctx.throw(404)
    // 更新
    user.password = await encryptor.hash(password)
    await user.save()
    await resetToken.destroy()
    // user.removeMeta(resetToken)
    // ## 响应客户端
    // ctx.session.user = user
    // ctx.redirect('/')
    ctx.redirect('/account/login')
  } catch (e) {
    return ctx.throw(404)
  }
})
