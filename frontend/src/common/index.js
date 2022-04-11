import components from './components'
import plugins from './plugins'

export default {
  install(app) {
    app.use(plugins)
    app.use(components)
  }
}