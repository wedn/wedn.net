import { Resource } from '../resource'

const tokens = new Resource('', {}, {
  create: { method: 'POST', url: 'tokens/create' },
  check: { method: 'POST', url: 'tokens/check' }
})

export default tokens
