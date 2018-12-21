require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const databaseConfig = require('./src/config/database')
const validate = require('express-validation')
const Youch = require('youch')
const path = require('path')
const cors = require('cors')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'
    this.setExpress()
    this.middleware()
    this.routes()
    this.database()
    this.exception()
  }
  setExpress () {
    this.express.set('clientPath', path.join(__dirname, 'src', 'client'))
    this.express.use(express.static(this.express.get('clientPath')))

    this.express.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      )
      next()
    })
    this.express.use(cors())

    this.express.use(
      express.static(path.resolve(__dirname, 'src', 'client', 'public'))
    )
  }
  database () {
    mongoose.connect(
      databaseConfig.uri,
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    )
  }
  middleware () {
    this.express.use(express.json())
  }
  routes () {
    this.express.use(routes)
  }
  exception () {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err)
        return res.json(await youch.toJSON())
      }

      // se não for erro de validação vamos retornar:
      return res
        .status(err.status || 500)
        .json({ error: 'Internal Server Error ' })
    })
  }
}

module.exports = new App().express
