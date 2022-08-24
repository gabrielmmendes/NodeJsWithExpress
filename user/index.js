const express = require('express')
const server = express()
server.use(express.json())

const userService = require('./service/UserService.js');

server.get('/users', (req, res) => {
  userService.getAllPaged(req.query.page).then(r => res.json(r))
})

server.get('/users/:index', (req, res) => {
  userService.getById(req.params.index).then(r => res.json(r))
})

server.post('/users', (req, res) => {
  userService.create(req.body).then(r => res.json(r))
})

server.put('/users/:index', (req, res) => {
  userService.updateById(req.params.index, req.body).then(r => res.json(r))
})

server.delete('/users/:index', (req, res) => {
  userService.deleteById(req.params.index).then(r => res.json(r))
})

server.listen(3000)