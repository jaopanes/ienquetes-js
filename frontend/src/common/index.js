import components from './components'
import plugins from './plugins'
import functions from './functions'

export default {
  install(app) {
    app.use(plugins)
    app.use(components)
    app.use(functions)
  }
}