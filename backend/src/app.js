require('dotenv/config')
const server = require('./shared/infra/server')

const port = process.env.SERVER_PORT || 5000
server.listen(port, () => console.log(`App listening on port ${port}`))
