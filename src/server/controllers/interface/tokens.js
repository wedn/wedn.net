import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import passport from 'koa-passport'

import { User } from '../../models'

export const router = new Router({ prefix: '/api/v1/tokens' })

/**
 * POST /api/v1/tokens/create
 */
router.post('/create', async ctx => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    ctx.body = { status: ctx.status = 401, errors: ['Incorrect username or password.'] }
    return
  }
  try {
    const user = await User.getByUnique(username)
    if (!user || !await user.validPassword(password)) {
      ctx.body = { status: ctx.status = 401, errors: ['Incorrect username or password.'] }
      return
    }
    const { issuer, audience, secretOrKey, expries } = ctx.config.jwt
    const token = jwt.sign({ sub: user.slug, iss: issuer, aud: audience }, secretOrKey, { expiresIn: expries })
    ctx.body = { status: ctx.status = 200, token: token }
  } catch (e) { // TODO: 异常处理
    ctx.body = { status: ctx.status = 500, errors: [e.message] }
  }
})

/**
 * POST /api/v1/tokens/check
 */
router.post('/check', passport.jwt((ctx, next, user) => {
  ctx.body = {
    status: ctx.status = 200,
    data: {
      id: user.id,
      slug: user.slug,
      avatar: `${ctx.options.site_url}users/avatars/${user.slug}`,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      mobile: user.mobile
    }
  }
}))
