# API

## Endpoints

- authentication
  - token
  - revoke
  - reset
- configuration
  - index
  - private
- settings
- uploads
- <post-type>
  - revisions
- users
  - me
- <taxonomy>
- comments
- media
- roles
- types
- slugs
- themes
- clients
- notifications

- http://i5ting.github.io/stuq-koa/index.html
- [跟着 Github 学习 Restful HTTP API 设计](http://cizixs.com/2016/12/12/restful-api-design-guide)
- 状态码：https://www.ibm.com/developerworks/cn/web/1103_chenyan_restapi/#major3
- http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/
- https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis/
- https://zhuanlan.zhihu.com/p/25506654
- https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
- [RESTful API 设计最佳实践](http://blog.jobbole.com/41233/)
- [原文](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
- [请求参数校验](https://github.com/koajs/joi-router)
- [Browse API Parameter Design](https://github.com/TryGhost/Ghost/issues/5463)
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

  const pagination = {
    // the current page number
    page: 1,
    // the previous page number
    prev: 1,
    // the next page number
    next: 1,
    // the number of pages available
    pages: 1,
    // the number of resources available
    total: 1,
    // the number of resources per page
    limit: 1
  }
  // const pagination = { page, prev, next, pages, total, limit }

  // response header
  // const headers = []
  // for (const key in meta) {
  //   const name = 'X-' + _.startCase(key).replace(' ', '-')
  //   ctx.set(name, meta[key])
  //   headers.push(name)
  // }
  // ctx.set('Access-Control-Expose-Headers', headers.join(', '))

/**
 * Prepare context
 */

module.exports = () => async (ctx, next) => {

}



/**
 * Parse query params
 *
 * @deprecated
 * @see
 * - https://github.com/pbatey/query-to-mongo
 */

const debug = require('debug')('wedn:api:middleware:query')
const q2m = require('query-to-mongo')

module.exports = () => async (ctx, next) => {
  const query = q2m(ctx.querystring)
  debug('query params: %o', query)
  ctx.q2m = query
  await next()
}


// http://huang-jerryc.com/2015/03/29/%E5%9F%BA%E4%BA%8ERESTful-API-%E6%80%8E%E4%B9%88%E8%AE%BE%E8%AE%A1%E7%94%A8%E6%88%B7%E6%9D%83%E9%99%90%E6%8E%A7%E5%88%B6/

 * - https://www.npmjs.com/package/joi
 * - https://www.npmjs.com/package/ajv
