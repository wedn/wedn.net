import Router from 'koa-router'
import passport from 'koa-passport'
import jwt from 'jsonwebtoken'

import { User } from '../../models'

export const router = new Router({ prefix: '/api/v1/tokens' })

/**
 * GET /api/v1/tokens
 * 检查 token 的可用性
 */
router.get('/', passport.jwt((ctx, next, user) => {
  const { id, slug, username, nickname, email, mobile } = user
  const avatar = `${ctx.options.site_url}users/avatars/${user.slug}`
  ctx.body = { status: 200, user: { id, slug, avatar, username, nickname, email, mobile } }
}))

/**
 * POST /api/v1/tokens
 * 创建一个新的 token
 */
router.post('/', async ctx => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    ctx.body = { status: ctx.status = 401, errors: [ 'Incorrect username or password.' ] }
    return
  }
  try {
    const user = await User.getByUnique(username)
    if (!user || !await user.validPassword(password)) {
      ctx.body = { status: ctx.status = 401, errors: [ 'Incorrect username or password.' ] }
      return
    }
    const { issuer, audience, secretOrKey, expries } = ctx.config.jwt
    const token = jwt.sign({ sub: user.slug, iss: issuer, aud: audience }, secretOrKey, { expiresIn: expries })
    ctx.body = { status: ctx.status = 200, token: token }
  } catch (e) { // TODO: 异常处理
    ctx.body = { status: ctx.status = 500, errors: [ e.message ] }
  }
})
