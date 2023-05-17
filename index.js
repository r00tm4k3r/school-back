require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')

const {routes} = require('./src/routes')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes.forEach((item) => {
    app.use(`/${item}`, require(`./src/routes/${item}`))
  })

http.createServer({}, app).listen(process.env.SRV_PORT || 3000)