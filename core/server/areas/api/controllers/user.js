const { User } = require('../../../models')

exports.index = async params => {
  const users = await User.find()
  return users
}

exports.create = async body => {
  const { username, email, mobile, password } = body
  const user = await User.create({ username, email, mobile, password })
  return user
}
