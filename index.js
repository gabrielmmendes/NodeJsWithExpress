const express = require('express')
const server = express()

server.get('/geeks', () => {
  console.log('teste')
})

server.listen(3000)
