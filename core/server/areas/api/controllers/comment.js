/**
 * Comments resource controller
 */

const { Comment } = require('../../../models')

/**
 * GET /comments
 * @param  {Object} params 参数
 * @return {Array}         输出数据
 */
exports.index = async params => {
  return Comment.find()
}

/**
 * GET /comments/new
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.new = async params => {
  return {}
}

/**
 * POST /comments
 * @param  {Object} body 输入数据
 * @return {Object}      输出数据
 */
exports.create = async body => {
  return Comment.create(body)
}

/**
 * GET /comments/:id
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.show = async params => {
  const { id } = params
  return Comment.findById(id)
}

/**
 * GET /comments/:id/edit
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.edit = async params => {
  const { id } = params
  return Comment.findById(id)
}

/**
 * PUT /comments/:id
 * @param  {Object} body   输入数据
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.update = async (body, params) => {
  const { id } = params
  return Comment.findByIdAndUpdate(id, body)
}

/**
 * DELETE /comments/:id
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.destroy = async params => {
  const { id } = params
  return Comment.findByIdAndRemove(id)
}
