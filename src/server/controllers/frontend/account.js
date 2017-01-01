/**
 * 账户中心模块控制器
 */
import Router from 'koa-router'
import passport from 'koa-passport'

export const router = new Router({ prefix: '/account' })

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
router.post('login_post', '/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: router.url('login'),
  failureFlash: true
}))
