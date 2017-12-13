/**
 * Authentication controller
 *
 * @todo SSO
 * @see
 * - http://www.jianshu.com/p/5ac8a0e1e5a8
 * - https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
 * - https://solidgeargroup.com/refresh-token-autenticacion-jwt-implementacion-nodejs
 * - https://github.com/oauthjs/node-oauth2-server
 * - http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html
 */

const jwt = require('jsonwebtoken')
const assert = require('http-assert')

const { User } = require('../../../models')
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

  user.tokens.push(token)
  await user.save()

  return { data: { type: 'Bearer', token: token, expries: expriesAt } }
}

/**
 * POST /auth/revoke
 * Revoke exist token
 */
exports.revoke = async body => {
  const { token } = body
  assert(token, 400, 'Missing required parameter: token')

  assert(false, 404, 'Token does not exist')
  return { data: { token: token } }
}
