import validator from 'validator'

module.exports = Object.assign({}, validator, {
  isKey: input => /^[a-z][a-z0-9_]+$/.test(input),
  isSlug: input => /^[a-z0-9_-]+$/.test(input),
  isUsername: input => /^[a-z][a-z0-9_-]{2,15}$/.test(input),
  isPassword: input => input.length <= 16 && input.length >= 6,
  isMobile: input => input === '' || /^[0-9]+$/.test(input)
})
