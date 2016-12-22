// import path from 'path'
// import convert from 'koa-convert'
// import error from 'koa-error'

export default config => (ctx, next) => {
  return next()
}

// convert(error({
//   engine: 'xtemplate',
//   template: path.join(__dirname, '../views/shared/', 'error.xtpl')
// }))

// /**
//  * 错误处理
//  * https://github.com/koajs/onerror
//  * https://github.com/koajs/error
//  */
// if (app.env === 'development') {
//   onerror(app)
// } else {
//   onerror(app, {
//     redirect: '/error.html'
//   })
// }
