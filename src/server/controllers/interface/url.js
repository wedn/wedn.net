import Router from 'koa-router'
import passport from 'koa-passport'

export const router = new Router({ prefix: '/api/v1' })

/**
 * Authenticate
 */
router.use(passport.jwt())

/**
 * GET /api/v1/options
 */
router.get('/', async ctx => {
  ctx.body = {
    comment_url: ''
  }
})
