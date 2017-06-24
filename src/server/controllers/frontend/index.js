import Router from 'koa-router'

import { router as account } from './account'
import { router as users } from './users'

export const router = new Router()

router.get('/', async ctx => {
  ctx.state.title = 'Home'
  await ctx.render('home/index')
})

router.get('/about', async ctx => {
  ctx.state.title = 'About'
  await ctx.render('home/index')
})

router.get('/contact', async ctx => {
  ctx.state.title = 'Contact'
  Date.now() % 2 && ctx.throw(500)
  await ctx.render('home/index')
})

router.use('/account', account.routes(), account.allowedMethods())

router.use('/users', users.routes(), users.allowedMethods())