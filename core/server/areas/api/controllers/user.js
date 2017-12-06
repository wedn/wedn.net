/**
 * Users resource controller
 */

const debug = require('debug')('wedn:api:controller:user')
const _ = require('lodash')
const createError = require('http-errors')
const { User } = require('../../../models')

const allowedFields = ['slug', 'username', 'email', 'mobile', 'nickname', 'avatar', 'status', 'roles', 'meta']

const getSelect = fields => {
  fields = Array.isArray(fields) ? fields : fields.split(',')
  return ['id'].concat(fields.filter(f => allowedFields.includes(f)))
}

/**
 * GET /users
 * @param  {Object} params 参数
 * @param  {Object} header 响应头
 * @return {Array}         输出数据
 *
 * @todo include, filter
 */
exports.index = async (params, header) => {
  let {
    limit = 20,
    page = 1,
    order = 'created_at desc',
    fields = allowedFields,
    include,
    filter
  } = params

  // normalize params
  limit = parseInt(limit)
  page = parseInt(page)

  debug('query params: %o', { limit, page, order, include, fields, filter })

  // query params
  const [ orderField, orderType = 'desc' ] = order.split(' ')
  const skip = (page - 1) * limit
  const select = getSelect(fields)

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
  const { slug, username, email, mobile, password, nickname, avatar, status, roles, meta } = body

  try {
    const entity = await User.create({ slug, username, email, mobile, password, nickname, avatar, status, roles, meta })
  } catch (e) {
    console.dir(e)
    throw createError(400, e)
  }

  return _.pick(entity, allowedFields)
}

/**
 * GET /users/:id
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.show = async params => {
  const {
    id,
    fields = allowedFields
  } = params

  const select = getSelect(fields)

  const entity = await User.findById(id).select(select)

  return _.pick(entity, select)
}

/**
 * GET /users/:id/edit
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.edit = async params => {
  return {}
}

/**
 * PUT /users/:id
 * @param  {Object} body   输入数据
 * @param  {Object} params 参数
 * @return {Object}        输出数据
 */
exports.update = async (body, params) => {
  const { id } = params
  const { slug, username, email, mobile, password, nickname, avatar, status, roles, meta } = body
  const entity = await User.findByIdAndUpdate(id, { slug, username, email, mobile, password, nickname, avatar, status, roles, meta })
  return _.pick(entity, allowedFields)
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
