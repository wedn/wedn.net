import bcrypt from 'bcrypt'
import config from '../config'

export const hash = password => bcrypt.hash(password, config.salt_rounds)

export const compare = (p1, p2) => bcrypt.compare(p1, p2)
