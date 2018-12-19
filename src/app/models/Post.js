const moongose = require('mongoose')
const moongosePaginate = require('mongoose-paginate')

const PostSchema = new moongose.Schema({
  description: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    default: 0
  },
  author: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})
PostSchema.plugin(moongosePaginate)
module.exports = moongose.model('Post', PostSchema)
