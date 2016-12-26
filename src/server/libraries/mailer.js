/* eslint no-eval: 0 */
import path from 'path'
import nodemailer from 'nodemailer'

import config from '../config'

const transporter = nodemailer.createTransport(config.mail)

const sendMail = message => {
  if (!(message && message.subject && message.html && message.from && message.to)) {
    return Promise.reject(new Error('邮件信息不完整'))
  }

  Object.assign(message, { generateTextFromHTML: true, encoding: 'base64' })

  return transporter.sendMail(message)
    .then(res => Promise.resolve(res))
    .catch(error => {
      if (error.code === 'ECONNECTION' && error.syscall === 'getaddrinfo') {
        return Promise.reject(new Error(error.message + '\n未检测到网络（公网）连接，请确认网络正常然后重试'))
      }
      if (error.code === 'ETIMEDOUT' && error.command === 'CONN') {
        return Promise.reject(new Error(error.message + '\n网络（公网）连接超时，请确认网络正常然后重试'))
      }
      if (error.responseCode === 550) {
        return Promise.reject(new Error(error.message + '\n收件人错误（不存在邮箱）'))
      }
      if (error.responseCode === 598) {
        return Promise.reject(new Error(error.message + '\n邮件中包含违禁词，发送失败'))
      }
      return Promise.reject(error)
    })
}

export const send = (subject, html, to, cc, attachments) => {
  const from = `"${config.mail.name}" <${config.mail.auth.user}>`
  if (typeof subject === 'object') {
    return sendMail(Object.assign({ from }, subject))
  }
  return sendMail({ from, subject, html, to, cc, attachments })
}
