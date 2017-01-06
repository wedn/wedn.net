import Router from 'koa-router'
import passport from 'koa-passport'

import { Option } from '../../models'

export const router = new Router({ prefix: '/api/v1/options' })

/**
 * Authenticate
 */
router.use(passport.jwt())

/**
 * GET /api/v1/options
 */
router.get('/', async ctx => {
  ctx.body = await Option.load()
})
