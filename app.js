const server = require('./server')
server.listen(process.env.PORT || 3000)

//  const serverIo = require('http').Server(this.express)
// const io = require('socket.io')(serverIo)

// this.express.use((req, res, next) => {
//   req.io = io
//   return next()
// })
