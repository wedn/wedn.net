import Router from 'koa-router'

export const router = new Router()

router.get('/', async ctx => {
  ctx.state.title = 'Home'
  await ctx.render('home/index')
})

router.get('/about', async ctx => {
  ctx.state.title = 'About'
  // throw new Error('demo')
  await ctx.render('home/index')
})

router.get('/contact', async ctx => {
  ctx.state.title = 'Contact'
  await ctx.render('home/index')
})
