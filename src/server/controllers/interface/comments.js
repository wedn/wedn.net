import Router from 'koa-router'
import passport from 'koa-passport'

import { Comment } from '../../models'

export const router = new Router({ prefix: '/api/v1/comments' })

/**
 * Authenticate
 */
router.use(passport.jwt())

/**
 * Error handle
 */
router.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.body = { status: ctx.status = 500, errors: [ e.message ] }
  }
})

/**
 * GET /api/v1/comments
 */
router.get('/', async ctx => {
  // const { start, count, sort, order } = ctx.request.query
  ctx.body = { status: 200, comments: await Comment.findAll() }
})

/**
 * POST /api/v1/comments
 */
router.post('/', async ctx => {
  // const { author, email, ip, content, status, user_agent, post_id, user_id, parent_id } = ctx.request.body
  ctx.body = { status: 200, comment: await Comment.create(ctx.request.body) }
})

/**
 * GET /api/v1/comments/:id
 */
router.get('/:id(\\d+)', async ctx => {
  const { id } = ctx.params
  ctx.body = { status: 200, comment: await Comment.findById(id) }
})

/**
 * DELETE /api/v1/comments/:id
 */
router.delete('/:id(\\d+)', async ctx => {
  const { id } = ctx.params
  const affectedCount = await Comment.destroy({ where: { id } })
  if (affectedCount) {
    ctx.body = { status: ctx.status = 200, message: 'success' }
  } else {
    ctx.body = { status: ctx.status = 400, message: 'fail' }
  }
})

/**
 * PUT /api/v1/comments/:id
 */
router.put('/:id(\\d+)', async ctx => {
  const { id } = ctx.params
  const [ affectedCount, affectedRows ] = await Comment.update(ctx.request.body, { where: { id } })
  if (affectedCount) {
    ctx.body = { status: ctx.status = 200, comment: affectedRows[0] }
  } else {
    ctx.body = { status: ctx.status = 400, message: 'fail' }
  }
})

/**
 * PATCH /api/v1/comments/:id
 */
router.patch('/:id(\\d+)', async ctx => {
  const { id } = ctx.params
  try {
    const comment = await Comment.findById(id)
    Object.assign(comment, ctx.request.body)
    await comment.update()
    ctx.body = { status: ctx.status = 200, comment: comment }
  } catch (e) {
    ctx.body = { status: ctx.status = 500, errors: [ e.message ] }
  }
})
