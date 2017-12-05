const { Comment } = require('../../../models')

exports.index = async ctx => {
  const comments = await Comment.find()
  ctx.body = comments
}

exports.create = async ctx => {
  const comment = new Comment(ctx.request.body)
  const saved = await comment.save()
  ctx.body = saved
}

exports.show = async ctx => {

}

exports.edit = async ctx => {

}

exports.update = async ctx => {

}

exports.destroy = async ctx => {

}
