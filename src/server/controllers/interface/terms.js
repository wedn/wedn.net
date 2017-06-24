import Router from 'koa-router'
import passport from 'koa-passport'

import { Term } from '../../models'

export const router = new Router({ prefix: '/api/v1/terms' })

/**
 * Authenticate
 */
router.use(passport.jwt())

/**
 * GET /api/v1/terms
 */
router.get('/', async ctx => {
  ctx.body = await Term.findAll()
})
