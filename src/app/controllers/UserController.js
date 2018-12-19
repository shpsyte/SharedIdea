const User = require('../models/User')

class UserControler {
  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }

  async index (req, res) {
    return res.json({ error: 'Nanana!' })
  }
}

module.exports = new UserControler()
