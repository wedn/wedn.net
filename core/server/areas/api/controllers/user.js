/**
 * Users resource controller
 *
 * References:
 * - https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
 * - pick es6 https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
 */

const debug = require('debug')('wedn:api:controller:user')
const _ = require('lodash')
const assert = require('http-assert')
const createError = require('http-errors')
const { User } = require('../../../models')

// allowed fields
const allowedFields = ['id', 'slug', 'username', 'email', 'mobile', 'nickname', 'avatar', 'status', 'created_at', 'updated_at', 'roles', 'meta']

/**
 * Utils functions
 */

// fields to select
const getSelect = fields => {
  if (fields === 'all') return allowedFields
  fields = Array.isArray(fields) ? fields : fields.split(',')
  return fields.filter(f => allowedFields.includes(f))
}

/**
 * GET /users
 * @param  {Object} params input parameters
 * @return {Array}         output data
 *
 * @todo include, filter
 */
exports.index = async params => {
  let { limit = 20, page = 1, order = 'created_at', fields = allowedFields, include, filter } = params

  // normalize params
  limit = parseInt(limit)
  page = parseInt(page)

  debug('query params: %o', { limit, page, order, include, fields, filter })

  // query params
  const [ sortField, sortType = 'desc' ] = order.split(' ')
  const skip = (page - 1) * limit
  const select = getSelect(fields)

  // exec query
  const total = await User.count()
  const entities = await User.find().sort({ [sortField]: sortType }).skip(skip).limit(limit).select(select)

  return {
    meta: { page, total, limit },
    data: entities.map(item => _.pick(item, allowedFields))
  }
}

/**
 * GET /users/new
 * @param  {Object} params input parameters
 * @return {Object}        output data
 */
exports.new = async params => {
  return {}
}

/**
 * POST /users
 * @param  {Object} body input data
 * @return {Object}      output data
 */
exports.create = async body => {
  let { slug, username, email, mobile, password, nickname, avatar, status, roles = ['subscriber'], meta } = body

  // params validate
  assert(username, 400, 'Missing required parameter: username.')
  assert(email, 400, 'Missing required parameter: email.')
  assert(password, 400, 'Missing required parameter: password.')

  // roles
  if (typeof roles === 'string') {
    roles = roles.split(',')
  }

  try {
    const entity = await User.create({ slug, username, email, mobile, password, nickname, avatar, status, roles, meta })
    return { status: 201, data: _.pick(entity, allowedFields) }
  } catch (e) {
    throw createError(422, e)
  }
}

/**
 * GET /users/:id
 * @param  {Object} params input parameters
 * @return {Object}        output data
 */
exports.show = async params => {
  const { id, fields = allowedFields } = params
  const entity = await User.findById(id).select(getSelect(fields))
  assert(entity, 404, 'This user does not exist.')
  return { data: _.pick(entity, allowedFields) }
}

/**
 * GET /users/:id/edit
 * @param  {Object} params input parameters
 * @return {Object}        output data
 */
exports.edit = async params => {
  return {}
}

/**
 * PUT /users/:id
 * @param  {Object} body   input data
 * @param  {Object} params input parameters
 * @return {Object}        output data
 */
exports.update = async (body, params) => {
  const { id } = params
  const { slug, username, email, mobile, password, nickname, avatar, status, roles, meta } = body

  // find exist user
  const exist = await User.findById(id)
  assert(exist, 404, 'This user does not exist.')

  // patch user info

  // exists validate
  if (slug && slug !== exist.slug) {
    const slugExists = await User.findOne({ slug, id: { $ne: exist.id } })
    assert(!slugExists, 422, 'The slug has already existed.')
    exist.slug = slug
  }

  if (username && username !== exist.username) {
    const usernameExists = await User.findOne({ username, id: { $ne: exist.id } })
    assert(!usernameExists, 422, 'The username has already existed.')
    exist.username = username
  }

  if (email && email !== exist.email) {
    const emailExists = await User.findOne({ email, id: { $ne: exist.id } })
    assert(!emailExists, 422, 'The email has already existed.')
    exist.email = email
  }

  if (mobile && mobile !== exist.mobile) {
    const mobileExists = await User.findOne({ mobile, id: { $ne: exist.id } })
    assert(!mobileExists, 422, 'The mobile has already existed.')
    exist.mobile = mobile
  }

  const entity = await exist.save()
  return { data: _.pick(entity, allowedFields) }
}

/**
 * DELETE /users/:id
 * @param  {Object} params input parameters
 * @return {Object}        output data
 */
exports.destroy = async params => {
  const { id } = params
  return { status: 204, data: User.findByIdAndRemove(id) }
}
