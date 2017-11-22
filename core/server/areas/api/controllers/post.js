const { Post } = require('../../../models')

exports.index = async ctx => {
  const posts = await Post.find()
  ctx.body = posts
}

exports.add = async ctx => {
  const post = new Post(ctx.request.body)
  const saved = await post.save()
  ctx.body = saved
}

exports.create = async ctx => {

}

exports.show = async ctx => {

}

exports.edit = async ctx => {

}

exports.update = async ctx => {

}

exports.destroy = async ctx => {

}
