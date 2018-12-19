require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const databaseConfig = require('./src/config/database')
const validate = require('express-validation')
const Youch = require('youch')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'
    this.middleware()
    this.routes()
    this.database()
    this.exception()
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
