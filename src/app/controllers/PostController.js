const Post = require('../models/Post')

class PostController {
  async index (req, res) {
    // const posts = await Post.find({})
    //   .sort('-createAt')
    //   .populate('author')

    const posts = await Post.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: req.query.limit || 20,
        populate: 'author',
        sort: '-createAt'
      }
    )
    return res.json(posts)
  }

  async show (req, res) {
    const post = await Post.findById(req.params.id).populate('author')
    return res.json(post)
  }

  async store (req, res) {
    const id = req.userId

    const post = await Post.create({ ...req.body, author: id || null })
    req.io.emit('newpost', post)
    return res.json(post)
  }

  async update (req, res) {
    return res.json({ msg: ' Not allowed' })
    // const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true
    // })

    // return res.json(post)
  }
  async destroy (req, res) {
    // return res.json({ msg: ' Not allowed' })
    await Post.deleteMany({})
    return res.send({ msg: 'ok' })
  }

  async like (req, res) {
    const post = await Post.findById(req.params.id)
    post.set({
      like: post.like + 1
    })
    await post.save()
    req.io.emit('newlike', post)
    return res.json(post)
  }
  //   new: true
  // })
}

module.exports = new PostController()
