import Router from 'koa-router'

import { router as admin } from './admin'

export const router = new Router()

router.use('/admin', admin.routes(), admin.allowedMethods())
