import express from 'express'
import { Nuxt, Builder } from 'nuxt'
require('dotenv').config()
import database from './model/index'
import shedule from 'node-schedule'
import parser from './parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import api from './api'
//import bot, {telPost} from './telegram'
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const sessionStore = new SequelizeStore({
  db: database,
	checkExpirationInterval: 15 * 60 * 1000,
	expiration: 7 * 24 * 60 * 60 * 1000
})
app.set('port', port)
app.use(bodyParser.json())
app.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: true,
	  store: sessionStore
}))
// Import API Routes
app.use('/api', api)


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
// Init Nuxt.js
const nuxt = new Nuxt(config)
// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
// Give nuxt middleware to express
app.use(nuxt.render)
// Listen the server
app.listen(port, host)
shedule.scheduleJob({second: '0' }, function () {
    parser()
    //telPost()
})

console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
