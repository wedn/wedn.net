import crypto from 'crypto'
import bcrypt from 'bcrypt'
import config from '../config'

export default {
  /**
   * 不可逆加密
   * @param  {String} input 待加密的明文
   * @return {String}       加密完的密文
   */
  hash (input) {
    return bcrypt.hash(input, config.encrypt.salt_rounds)
  },

  /**
   * 不可逆加密比对
   * @param  {String}  p1 加密后的密文
   * @param  {String}  p2 明文
   * @return {Boolean}    是否匹配
   */
  compare (p1, p2) {
    return bcrypt.compare(p1, p2)
  },

  /**
   * 可逆加密
   * @param  {String} input 明文
   * @return {String}       密文
   */
  encrypt (input) {
    const cipher = crypto.createCipher('aes-256-cbc', config.encrypt.key)
    let enc = cipher.update(input, 'binary', 'hex')
    enc += cipher.final('hex')
    return enc
  },

  /**
   * 解密
   * @param  {String} input 密文
   * @return {String}       明文
   */
  decrypt (input) {
    const decipher = crypto.createDecipher('aes-256-cbc', config.encrypt.key)
    let dec = decipher.update(input, 'hex', 'binary')
    dec += decipher.final('binary')
    return dec
  }
}