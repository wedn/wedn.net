import Router from 'koa-router'

export const router = new Router()

router.get('/', async ctx => {
  await ctx.render('home/index')
})

router.get('/about', async ctx => {
  await ctx.render('home/index')
})

router.get('/contact', async ctx => {
  await ctx.render('home/index')
})
