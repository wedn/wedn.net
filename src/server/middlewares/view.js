import path from 'path'
import convert from 'koa-convert'
import compose from 'koa-compose'
import json from 'koa-json'
import xtpl from 'koa-xtpl'

export default (options) => {
  const engines = []

  // JSON Format
  engines.push(convert(json({
    pretty: false,
    param: 'pretty'
  })))

  // Template Engine
  engines.push(xtpl({
    root: path.join(__dirname, '../views/')
  }))

  return compose(engines)
}
