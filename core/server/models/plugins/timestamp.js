/**
 * Deprecated
 * use schema options instead
 */
module.exports = (schema, options) => {
  // Add fields to schema
  schema.add({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  })

  // Pre save hook
  schema.pre('save', function (next) {
    // if (!this.id) this.created = new Date()
    this.updated = new Date()
    next()
  })
}
