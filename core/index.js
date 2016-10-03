// Import modules
import { start } from './server'
import pkg from '../package.json'
import config from './config'

// Node envionment
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

start(Object.assign({ name: pkg.name, version: pkg.version }, config[process.env.NODE_ENV]))
