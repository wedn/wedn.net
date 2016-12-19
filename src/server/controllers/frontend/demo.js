import Router from 'koa-router'

export const router = new Router({ prefix: '/demo' })

router.get('/', ctx => {
  ctx.body = 'demo/home'
})

router.get('/about', ctx => {
  ctx.body = 'demo/about'
})

router.get('/contact', ctx => {
  ctx.body = 'demo/contact'
})
