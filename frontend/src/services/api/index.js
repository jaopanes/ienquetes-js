import config from './config'

import user from './modules/user'
import survey from './modules/survey'

export default {
  user: user(config),
  survey: survey(config)
}