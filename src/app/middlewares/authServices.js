const jwt = require('jsonwebtoken')
const auth = require('../../config/auth')
const { promisify } = require('util')

class AuthServices {
  async store (req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) return next()

    const [, token] = authHeader.split(' ')

    try {
      const decoded = await promisify(jwt.verify)(token, auth.app_secret)
      req.userId = decoded.id
      return next()
    } catch (error) {
      return next()
    }
  }
}

module.exports = new AuthServices()
