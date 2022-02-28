require('dotenv/config')

const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes(express.Router()))

const port = process.env.SERVER_PORT || 3333

app.listen(port, () => console.log(`App listening on port ${port}`))

