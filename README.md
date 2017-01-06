# wedn.net

[![Build Status][travis-image]][travis-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

[travis-image]: https://travis-ci.org/wedn/wedn.net.svg?branch=master
[travis-url]: https://travis-ci.org/wedn/wedn.net
[dependency-image]: https://david-dm.org/wedn/wedn.net/status.svg
[dependency-url]: https://david-dm.org/wedn/wedn.net
[devdependency-image]: https://david-dm.org/wedn/wedn.net/dev-status.svg
[devdependency-url]: https://david-dm.org/wedn/wedn.net?type=dev
[style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[style-url]: http://standardjs.com/

> wedn.net site

## Clone it

```bash
$ cd path/to/root
$ git clone https://github.com/wedn/wedn.net.git --depth 1 --recursive
$ cd wedn.net
```

## Install dependencies

```bash
$ npm install
# or
$ yarn
```

## Usage

```bash
# build for production with minification
$ npm run build

# watch file changes for development
$ npm run dev
```


## License

[MIT](LICENSE) &copy; [汪磊](http://github.com/zce) & [WEDN.NET](http://wedn.net)


## NPM 

```bash
npm i -S glob handlebars koa@next koa-bodyparser@next koa-compose@next koa-compress@next koa-convert koa-error koa-json@next koa-logger@next koa-mount@next koa-router@next koa-session koa-static@next koa-views@next lodash.merge
```

## Links

- https://github.com/xiongwilee/koa-grace
- https://github.com/shellscape/koa-webpack
- https://github.com/leecade/koa-webpack-middleware
- https://github.com/minghe/koa-book

## API Standards

```json
{
  "status": 200 / 400 / 500,
  "errors": [],
  "data": {}
}
```
