import Router from 'koa-router'
import passport from 'koa-passport'

import { User } from '../../models'

export const router = new Router({ prefix: '/api/v1/users' })

/**
 * Authenticate
 */
router.use(passport.jwt())

/**
 * GET /api/v1/users
 */
router.get('/', async ctx => {
  ctx.body = await User.findAll()
})
