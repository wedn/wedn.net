/**
 * Mailer
 *
 * @see
 * - https://nodemailer.com/
 */

const assert = require('assert')
const nodemailer = require('nodemailer')

const config = require('../config')

const transporter = nodemailer.createTransport(config.mail)

const sendMessage = message => {
  if (typeof message !== 'object') {
    throw new TypeError(`Expected a object, got ${typeof input}`)
  }

  // const { from, to, cc, bcc, subject, text, html, attachments } = message

  assert(message.from, 'Missing required option: from.')
  assert(message.to, 'Missing required option: to.')
  assert(message.subject, 'Missing required option: subject.')
  assert(message.text || message.html, 'Missing required option: text or html.')

  return transporter.sendMail(Object.assign({}, message))
    .catch(error => {
      if (error.code === 'ECONNECTION' && error.syscall === 'getaddrinfo') {
        throw new Error(error.message + '\n未检测到网络（公网）连接，请确认网络正常然后重试')
      }
      if (error.code === 'ETIMEDOUT' && error.command === 'CONN') {
        throw new Error(error.message + '\n网络（公网）连接超时，请确认网络正常然后重试')
      }
      if (error.responseCode === 550) {
        throw new Error(error.message + '\n收件人错误（不存在邮箱）')
      }
      if (error.responseCode === 598) {
        throw new Error(error.message + '\n邮件中包含违禁词，发送失败')
      }
      throw error
    })
}

exports.send = (to, subject, html, attachments, cc, bcc) => {
  const from = `"${config.mail.name}" <${config.mail.auth.user}>`
  return typeof to === 'string'
    ? sendMessage({ from, to, cc, bcc, subject, html, attachments })
    : sendMessage(Object.assign({ from }, to))
}
