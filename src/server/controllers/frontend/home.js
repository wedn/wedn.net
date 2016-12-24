import Router from 'koa-router'

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
