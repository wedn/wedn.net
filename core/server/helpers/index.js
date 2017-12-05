const helpers = module.exports = {}

helpers.equal = function (a, b, opts) {
  if (!opts) throw new Error('Handlebars Helper `equal` needs 2 parameters')
  return a === b ? opts.fn(opts.data.root) : opts.inverse(opts.data.root)
}
