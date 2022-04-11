import config from './config'
import user from './modules/user'

export default {
  user: user(config),
}