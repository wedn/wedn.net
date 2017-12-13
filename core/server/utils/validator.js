/**
 * Validator
 *
 * @see
 * - https://github.com/chriso/validator.js
 */

const validator = require('validator')

module.exports = Object.assign({}, validator, {
  isKey: input => /^[a-z][a-z0-9_]+$/.test(input),
  isSlug: input => /^[a-z0-9_-]+$/.test(input),
  isUsername: input => /^[a-z][a-z0-9_-]{2,15}$/.test(input),
  isPassword: input => input.length >= 6 && input.length <= 16,
  isNickname: input => input.length >= 1 && input.length <= 10,
  isMobile: input => /^[0-9]+$/.test(input)
})
