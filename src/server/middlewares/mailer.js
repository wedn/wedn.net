import nodemailer from 'nodemailer'

let transporter, config

function sendMessage (message) {
  if (!transporter) {
    return Promise.reject(new Error('Please use `mailer.config(options)`'))
  }

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

const mailer = {
  /**
   * 配置邮件选项
   * @param  {Object} options 邮件选项
   * @return {Object}         配置后的对象
   */
  config (options) {
    config = {
      host: options.mail_server_hostname,
      port: options.mail_server_port,
      secure: options.mail_server_secure,
      name: options.mail_server_name,
      auth: {
        user: options.mail_server_login,
        pass: options.mail_server_password
      },
      connectionTimeout: 1000,
      greetingTimeout: 1000,
      socketTimeout: 2000,
      debug: process.env.NODE_ENV === 'development'
    }
    transporter = nodemailer.createTransport(config)
    return this
  },

  send (subject, html, to, cc, attachments) {
    const from = `"${config.name}" <${config.auth.user}>`
    if (typeof subject === 'object') {
      return sendMessage(Object.assign({ from }, subject))
    }
    return sendMessage({ from, subject, html, to, cc, attachments })
  }
}

export default app => {
  // ## Email server config
  mailer.config(app.config.options)
  app.context.sendMail = mailer.send
  return (ctx, next) => next()
}
