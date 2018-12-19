const Joi = require('joi')

// exporta o que queremos validar
module.exports = {
  body: {
    description: Joi.string().required()
  }
}
