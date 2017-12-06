/**
 * Users resource controller
 */

const { User } = require('../../../models')

/**
 * GET /users
 * @param  {Object} params 参数
 * @return {Array}         输出数据
 */
exports.index = async params => {
  return User.find()
}

/**
 * GET /users/new
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.new = async params => {
  return {}
}

/**
 * POST /users
 * @param  {Object} body 输入数据
 * @return {Object}      输出数据
 */
exports.create = async body => {
  return User.create(body)
}

/**
 * GET /users/:id
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.show = async params => {
  const { id } = params
  return User.findById(id)
}

/**
 * GET /users/:id/edit
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.edit = async params => {
  const { id } = params
  return User.findById(id)
}

/**
 * PUT /users/:id
 * @param  {Object} body   输入数据
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.update = async (body, params) => {
  const { id } = params
  return User.findByIdAndUpdate(id, body)
}

/**
 * DELETE /users/:id
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.destroy = async params => {
  const { id } = params
  return User.findByIdAndRemove(id)
}
