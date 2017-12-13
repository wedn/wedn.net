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
- http://cizixs.com/2016/12/12/restful-api-design-guide
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
