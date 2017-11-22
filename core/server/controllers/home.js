exports.index = async ctx => {
  ctx.state.title = 'Hello world'
  await ctx.render('index')
}

exports.about = async ctx => {
  ctx.body = 'Hello about'
}

exports.contact = async ctx => {
  ctx.body = 'Hello contact'
}

exports.throw = async ctx => {
  ctx.throw(401)
}
