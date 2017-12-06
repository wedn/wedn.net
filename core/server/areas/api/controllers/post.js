/**
 * Posts resource controller
 */

const { Post } = require('../../../models')

/**
 * GET /posts
 * @param  {Object} params 参数
 * @return {Array}         输出数据
 */
exports.index = async params => {
  return Post.find()
}

/**
 * GET /posts/new
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.new = async params => {
  return {}
}

/**
 * POST /posts
 * @param  {Object} body 输入数据
 * @return {Object}      输出数据
 */
exports.create = async body => {
  return Post.create(body)
}

/**
 * GET /posts/:id
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.show = async params => {
  const { id } = params
  return Post.findById(id)
}

/**
 * GET /posts/:id/edit
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.edit = async params => {
  const { id } = params
  return Post.findById(id)
}

/**
 * PUT /posts/:id
 * @param  {Object} body   输入数据
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.update = async (body, params) => {
  const { id } = params
  return Post.findByIdAndUpdate(id, body)
}

/**
 * DELETE /posts/:id
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.destroy = async params => {
  const { id } = params
  return Post.findByIdAndRemove(id)
}
