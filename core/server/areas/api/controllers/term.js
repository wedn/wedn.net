/**
 * Terms resource controller
 */

const { Term } = require('../../../models')

/**
 * GET /terms
 * @param  {Object} params 参数
 * @return {Array}         输出数据
 */
exports.index = async params => {
  return Term.find()
}

/**
 * GET /terms/new
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.new = async params => {
  return {}
}

/**
 * POST /terms
 * @param  {Object} body 输入数据
 * @return {Object}      输出数据
 */
exports.create = async body => {
  return Term.create(body)
}

/**
 * GET /terms/:id
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.show = async params => {
  const { id } = params
  return Term.findById(id)
}

/**
 * GET /terms/:id/edit
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.edit = async params => {
  const { id } = params
  return Term.findById(id)
}

/**
 * PUT /terms/:id
 * @param  {Object} body   输入数据
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.update = async (body, params) => {
  const { id } = params
  return Term.findByIdAndUpdate(id, body)
}

/**
 * DELETE /terms/:id
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.destroy = async params => {
  const { id } = params
  return Term.findByIdAndRemove(id)
}
