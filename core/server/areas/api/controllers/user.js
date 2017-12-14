/**
 * Users resource controller
 *
 * @see
 * - https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
 * - pick es6 https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
 */

const { pick } = require('lodash')
const { User } = require('../../../models')
const { q2m } = require('../utils')

// alloweds
const allowedFields = ['id', 'slug', 'username', 'email', 'mobile', 'nickname', 'avatar', 'status', 'created_at', 'updated_at', 'roles', 'meta']
const allowedInclude = ['posts']

/**
 * GET /users
 * @param  {Object} ctx context
 * @todo include, filter
 */
exports.index = async ctx => {
  const { filter, fields, options, include } = ctx.q2m

  // query total count
  ctx.pagination.total = await User.count(filter)

  // query data
  const entities = await User.find(filter, fields, options).populate(include)

  // pick data
  ctx.body = entities.map(item => pick(item, allowedFields.concat(allowedInclude)))
}

/**
 * GET /users/new
 * @param  {Object} ctx context
 */
exports.new = async ctx => {
  return {}
}

/**
 * POST /users
 * @param  {Object} ctx context
 */
exports.create = async ctx => {
  let { slug, username, email, mobile, password, nickname, status, roles, meta } = ctx.request.body

  // params validate
  ctx.assert(username, 400, 'Missing required parameter: username.')
  ctx.assert(email, 400, 'Missing required parameter: email.')
  ctx.assert(password, 400, 'Missing required parameter: password.')

  // roles
  if (typeof roles === 'string') {
    roles = roles.split(',')
  }

  try {
    const entity = await User.create({ slug, username, email, mobile, password, nickname, status, roles, meta })
    ctx.status = 201
    ctx.body = pick(entity, allowedFields)
  } catch (e) {
    ctx.throw(422, e)
  }
}

/**
 * GET /users/:id
 * @param  {Object} ctx context
 */
exports.show = async ctx => {
  const { id, fields = allowedFields } = options
  const entity = await User.findById(id).select(getSelect(fields))
  ctx.assert(entity, 404, 'This user does not exist.')
  return { data: pick(entity, allowedFields) }
}

/**
 * GET /users/:id/edit
 * @param  {Object} ctx context
 */
exports.edit = async ctx => {
  return {}
}

/**
 * PUT /users/:id
 * @param  {Object} ctx context
 */
exports.update = async ctx => {
  const { id } = options
  const { slug, username, email, mobile, password, nickname, avatar, status, roles, meta } = body

  // find exist user
  const exist = await User.findById(id)
  ctx.assert(exist, 404, 'This user does not exist.')

  // patch user info

  // exists validate
  if (slug && slug !== exist.slug) {
    const slugExists = await User.findOne({ slug, id: { $ne: exist.id } })
    ctx.assert(!slugExists, 422, 'The slug has already existed.')
    exist.slug = slug
  }

  if (username && username !== exist.username) {
    const usernameExists = await User.findOne({ username, id: { $ne: exist.id } })
    ctx.assert(!usernameExists, 422, 'The username has already existed.')
    exist.username = username
  }

  if (email && email !== exist.email) {
    const emailExists = await User.findOne({ email, id: { $ne: exist.id } })
    ctx.assert(!emailExists, 422, 'The email has already existed.')
    exist.email = email
  }

  if (mobile && mobile !== exist.mobile) {
    const mobileExists = await User.findOne({ mobile, id: { $ne: exist.id } })
    ctx.assert(!mobileExists, 422, 'The mobile has already existed.')
    exist.mobile = mobile
  }

  const entity = await exist.save()
  return { data: pick(entity, allowedFields) }
}

/**
 * DELETE /users/:id
 * @param  {Object} ctx context
 */
exports.destroy = async ctx => {
  const { id } = options
  return { status: 204, data: User.findByIdAndRemove(id) }
}
