/**
 * View engine
 * https://github.com/koajs/koa-hbs/blob/master/index.js
 * https://github.com/dominicbarnes/koa-handlebars/blob/master/index.js
 */
const path = require('path')
const fs = require('mz/fs')
const fm = require('front-matter')
const hbs = require('handlebars')
const helpers = require('../helpers')

module.exports = app => {
  const templateCache = {}

  const viewDir = path.join(__dirname, '../views/')
  const extname = '.html'

  // register helpers
  hbs.registerHelper(helpers)

  /**
   * get template from cache
   * @param  {String} filename template file name
   * @return {[type]}          [description]
   */
  const getTemplate = async filename => {
    if (templateCache[filename] && app.env !== 'development') {
      // from cache
      return templateCache[filename]
    }

    const { body, attributes } = fm(await fs.readFile(filename, 'utf-8'))
    const template = hbs.compile(body, { strict: false })
    template.meta = attributes

    // cached template
    templateCache[filename] = template

    return template
  }

  // recursive render template
  const renderTemplate = async (filename, data, result) => {
    if (result) {
      data.body = new hbs.SafeString(result)
      data.placeholder = data.body
    }

    const template = await getTemplate(filename)

    result = template(data, {})

    // try to find layout
    if (template.meta.layout) {
      const currentDir = path.dirname(filename)
      const layoutFilename = path.resolve(currentDir, template.meta.layout + extname)
      result = await renderTemplate(layoutFilename, data, result)
    }

    return result
  }

  app.context.render = async function (name, data, output = true) {
    const filename = path.join(viewDir, name + extname)

    // template data
    data = Object.assign({}, this.state, data)

    // render template
    const result = await renderTemplate(filename, data)

    // response
    if (output) {
      this.type = 'text/html'
      this.body = result
    }

    return result
  }

  return (ctx, next) => next()
}

// data:
// {
//   context: this,
//   request: this.request,
//   response: this.response,
//   cookie: this.cookie,
//   session: this.session,
//   config: this.config
// }
