import log4js from 'log4js'
import config from '../config'

log4js.configure({
  appenders: [{ type: 'console' }].concat(config.logger)
})

export default log4js.getLogger('main')
