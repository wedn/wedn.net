import Router from 'koa-router'

import authorize from '../common/authorize'
import { User } from '../../models'

export const router = new Router({ prefix: '/api/v1/users' })

/**
 * GET /api/v1/users
 */
router.get('/', async ctx => {
})
