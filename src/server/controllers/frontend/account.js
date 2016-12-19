import Router from 'koa-router'

export const router = new Router({ prefix: '/account' })

router.get('/', ctx => {
  ctx.status = 301
  ctx.redirect(Router.url('login'))
})

router.get('login', '/login', async ctx => {
  await ctx.render('account/index', { title: '登录',  })
})

router.get('logout', '/logout', async ctx => {
  await ctx.render('account/index')
})

router.get('register', '/register', async ctx => {
  await ctx.render('account/index', { title: '注册', isRegister: true })
})
