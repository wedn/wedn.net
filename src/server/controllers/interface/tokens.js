import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import passport from 'koa-passport'
import { ExtractJwt } from 'passport-jwt'

import { User } from '../../models'

export const router = new Router({ prefix: '/api/v1/tokens' })

/**
 * POST /api/v1/tokens/create
 */
router.post('/create', async ctx => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    ctx.status = 401
    // ctx.body = { error: true, message: '用户名或密码错误！' }
    ctx.body = { error: true, message: 'Incorrect username or password.' }
    return
  }
  try {
    const user = await User.getByUnique(username)
    if (!user || !await user.validPassword(password)) {
      ctx.status = 401
      // ctx.body = { error: true, message: '用户名或密码错误！' }
      ctx.body = { error: true, message: 'Incorrect username or password.' }
      return
    }
    const { issuer, audience, secretOrKey } = ctx.app.config.jwt
    const token = jwt.sign({
      sub: user.slug,
      iss: issuer,
      aud: audience
    }, secretOrKey, { expiresIn: 60 })
    ctx.body = { token: token }
  } catch (e) {
    // TODO: 异常处理
    ctx.status = 500
    ctx.body = { error: true, message: e.message }
  }
})

/**
 * POST /api/v1/tokens/check
 */
router.post('/check', async ctx => {
  return passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      // ctx.body = { error: true, message: '出现错误，请稍后重试！' }
      ctx.body = { error: true, message: 'Error occurred.' }
      return
    }
    if (user) {
      // ctx.body = { message: 'Token 校验成功！' }
      ctx.body = {
        slug: user.slug,
        username: user.username,
        email: user.email,
        mobile: user.mobile
      }
      return
    }
    // ctx.body = { error: true, message: 'Token 校验失败，请重新获取！' }
    ctx.body = { error: true, message: 'Invalid token.' }
  })(ctx)
})
