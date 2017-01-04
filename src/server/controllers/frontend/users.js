import Router from 'koa-router'

export const router = new Router({ prefix: '/users' })

router.get('/avatars/:slug', async ctx => {
  await ctx.send(`avatars/${ctx.params.slug}.png`, { root: ctx.config.paths.uploads })
})
