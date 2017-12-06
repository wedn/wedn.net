/**
 * Authentication controller
 * @todo SSO
 */

const jwt = require('jsonwebtoken')
const assert = require('http-assert')

const { User, Token } = require('../../../models')
const config = require('../../../config')

/**
 * POST /auth/token
 * Generate new token
 */
exports.token = async (body, params) => {
  const { username, password } = body
  // You must send the username and the password.
  assert(username, 400, 'Missing required parameter: username.')
  assert(password, 400, 'Missing required parameter: password.')

  const user = await User.findByUnique(username)
  // Incorrect username or password.
  assert(user, 401, 'There is no user with that username.')
  const matched = await user.comparePassword(password)
  assert(matched, 401, 'Your password is incorrect.')

  const { issuer, audience, secret, expries } = config.jwt
  const payload = { sub: user.id, iss: issuer, aud: audience }
  const token = jwt.sign(payload, secret, { expiresIn: expries })

  const expriesAt = Date.now() + expries * 1000

  await Token.create({
    token: token,
    ip: params.ip,
    agent: params.userAgent,
    expries: new Date(expriesAt),
    user: user
  })

  return { type: 'Bearer', token: token, expries: expriesAt }
}

/**
 * POST /auth/revoke
 * Revoke exist token
 */
exports.revoke = async body => {
  const { token } = body
  assert(token, 400, 'Missing required parameter: token')

  const res = await Token.findOneAndRemove({ token })
  assert(res, 404, 'Token does not exist')
  return { token: token }
}
