/**
 * Users resource controller
 *
 * @see
 * - https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
 * - pick es6 https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
 */

const { pick } = require('lodash')
const assert = require('http-assert')
const createError = require('http-errors')
const { User } = require('../../../models')
const utils = require('./utils')

// alloweds
const allowedFields = ['id', 'slug', 'username', 'email', 'mobile', 'nickname', 'avatar', 'status', 'created_at', 'updated_at', 'roles', 'meta']
const allowedInclude = []

/**
 * GET /users
 * @param  {Object} options input parameters
 * @return {Array}          output data
 *
 * @todo include, filter
 */
exports.index = async options => {
  const { page, limit, skip, sort, fields, include, filter } = utils.getParams(options, allowedFields, allowedInclude)

  // exec query
  const total = await User.count(filter)
  const entities = await User.find(filter).sort(sort).skip(skip).limit(limit).select(fields)

  return {
    meta: { page, total, limit },
    data: entities.map(item => pick(item, allowedFields))
  }
}

/**
 * GET /users/new
 * @param  {Object} options input parameters
 * @return {Object}         output data
 */
exports.new = async options => {
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
    return { status: 201, data: pick(entity, allowedFields) }
  } catch (e) {
    throw createError(422, e)
  }
}

/**
 * GET /users/:id
 * @param  {Object} options input parameters
 * @return {Object}         output data
 */
exports.show = async options => {
  const { id, fields = allowedFields } = options
  const entity = await User.findById(id).select(getSelect(fields))
  assert(entity, 404, 'This user does not exist.')
  return { data: pick(entity, allowedFields) }
}

/**
 * GET /users/:id/edit
 * @param  {Object} options input parameters
 * @return {Object}         output data
 */
exports.edit = async options => {
  return {}
}

/**
 * PUT /users/:id
 * @param  {Object} body    input data
 * @param  {Object} options input parameters
 * @return {Object}         output data
 */
exports.update = async (body, options) => {
  const { id } = options
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
  return { data: pick(entity, allowedFields) }
}

/**
 * DELETE /users/:id
 * @param  {Object} options input parameters
 * @return {Object}         output data
 */
exports.destroy = async options => {
  const { id } = options
  return { status: 204, data: User.findByIdAndRemove(id) }
}
