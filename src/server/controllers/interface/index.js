import Router from 'koa-router'

import { router as comments } from './comments'
import { router as tokens } from './tokens'

export const router = new Router()

router.use('/comments', comments.routes(), comments.allowedMethods())
router.use('/tokens', tokens.routes(), tokens.allowedMethods())
