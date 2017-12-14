/**
 * User controller schema
 */

const joi = require('joi')

exports.index = {
  slug: joi.string(),
  username: joi.string().required().min(1).max(20),
  email: joi.string().email().required(),
  mobile: joi.string().integer(),
  password: joi.string().required(),
  nickname: joi.string(),
  avatar: joi.string(),
  status: joi.string(),
  roles: joi.array().allow(),
  meta: joi.object()
}
