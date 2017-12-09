/**
 * Encrytor
 *
 * References:
 * - http://blog.fens.me/nodejs-crypto/
 * - http://lmcw.cn/?id=14
 */

const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const config = require('../config')

const { saltRounds, secret } = config.encrypt

/**
 * Asynchronously generates a hash for the given string.
 * @param  {String}  plain String to hash
 * @return {Promise}       Promise with resulting hash
 */
exports.hash = plain => bcrypt.hash(plain, saltRounds)

/**
 * Asynchronously compares the given data against the given hash.
 * @param  {String}  plain Plain text string to compare
 * @param  {String}  hash  Hash text string to be compared to
 * @return {Boolean}       Promise with resulting matched
 */
exports.compare = (plain, hash) => bcrypt.compare(plain, hash)

/**
 * Reversible encrypting
 * @param  {String} plain Plain string to encrypt
 * @return {String}       Hash string
 */
exports.encrypt = plain => {
  const cipher = crypto.createCipher('aes-256-cbc', secret)
  return cipher.update(plain, 'binary', 'hex') + cipher.final('hex')
}

/**
 * Deciphering
 * @param  {String} hash  Hash string to decrypt
 * @return {String}       Plain string
 */
exports.decrypt = hash => {
  const decipher = crypto.createDecipher('aes-256-cbc', secret)
  return decipher.update(hash, 'hex', 'binary') + decipher.final('binary')
}

/**
 * MD5
 * @param  {String} plain     Plain string to encrypt
 * @param {Boolean} uppercase Return uppercase
 */
exports.md5 = (plain, uppercase) => {
  const md5 = crypto.createHash('md5').update(plain).digest('hex')
  return uppercase ? md5.toUpperCase() : md5
}
