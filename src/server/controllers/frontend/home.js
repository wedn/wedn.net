import Router from 'koa-router'

export const router = new Router()

router.get('/', ctx => {
  ctx.cookies.set('demo1', 'hello world')
  ctx.cookies.set('demo2', 'hello world', { signed: true })
  // throw new Error('sdfsd')
  ctx.body = { name: 'zhangsan' }
})

router.get('/about', ctx => {
  console.log(ctx.cookies.get('demo1', { signed: false }))
  ctx.body = '123'
})

router.get('/contact', ctx => {
  ctx.body = 'contact'
})
