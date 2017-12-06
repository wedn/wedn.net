/**
 * Users resource controller
 */

const debug = require('debug')('wedn:api:controller:user')
const _ = require('lodash')
const { User } = require('../../../models')

/**
 * GET /users
 * @param  {Object} params 参数
 * @param  {Object} header 响应头
 * @return {Array}         输出数据
 */
exports.index = async (params, header) => {
  let {
    limit = 20,
    page = 1,
    order = 'created_at desc',
    fields = 'slug,username,email,mobile,nickname,avatar,status,roles,meta',
    include,
    filter
  } = params

  limit = parseInt(limit)
  page = parseInt(page)

  debug({ limit, page, order, include, fields, filter })

  const [ orderField, orderType = 'desc' ] = order.split(' ')
  const skip = (page - 1) * limit
  const select = ['id'].concat(fields.split(','))

  const count = await User.count()

  header['Total-Count'] = count
  header['Total-Pages'] = Math.ceil(count / limit)

  const entities = await User.find()
    .sort({ [orderField]: orderType })
    .skip(skip)
    .limit(limit)
    .select(select)
    .exec()

  return entities.map(item => _.pick(item, select))
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
