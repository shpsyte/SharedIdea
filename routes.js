const express = require('express')
const routes = express.Router()
const controllers = require('./src/app/controllers')
const authMiddeware = require('./src/app/middlewares/auth')
const authServices = require('./src/app/middlewares/authServices')
const validate = require('express-validation')
const validators = require('./src/app/validators')

// routes.get('/', (req, res) => {
//  return res.jons({ route: 'ok' })
// })

/**
 * User Controller
 */
routes.post(
  '/users',
  validate(validators.User),
  controllers.UserController.store
)
routes.get('/users', controllers.UserController.index)

/**
 * Session
 */
routes.post('/sessions', controllers.SessionController.store)

routes.get('/post', controllers.PostController.index)
routes.get('/post/:id', controllers.PostController.show)
routes.post(
  '/post',
  validate(validators.Post),
  authServices.store,
  controllers.PostController.store
)
routes.put(
  '/post/:id',
  validate(validators.Post),
  authMiddeware,
  controllers.PostController.update
)
routes.delete(
  '/post/:id',
  validate(validators.Post),
  authMiddeware,
  controllers.PostController.destroy
)

// todos as rotas abaixo desta linha deverao estar autenticadas
// routes.use(authMiddeware)

/**
 * Test to login
 */
routes.post('/test', authMiddeware, (req, res) => {
  return res.send('ok')
})

module.exports = routes
