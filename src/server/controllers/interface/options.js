import Router from 'koa-router'

import authorize from '../common/authorize'
import { Option } from '../../models'

export const router = new Router({ prefix: '/api/v1/options' })

/**
 * 权限验证
 */
router.use(authorize('administrator'))

/**
 * GET /api/v1/options
 */
router.get('/', async ctx => {
  ctx.body = await Option.load()
})
