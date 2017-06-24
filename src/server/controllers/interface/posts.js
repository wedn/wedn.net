import Router from 'koa-router'
import passport from 'koa-passport'

import { Post } from '../../models'

export const router = new Router({ prefix: '/api/v1/posts' })

/**
 * Authenticate
 */
router.use(passport.jwt())

/**
 * GET /api/v1/posts
 */
router.get('/', async ctx => {
  ctx.body = await Post.findAll()
})
