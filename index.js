const express = require('express')
const server = express()
server.use(express.json())
const users = [ ]

//req ➔ representa todos os dados da requisição que o cliente faz
//res ➔ todas as informações necessárias para informar uma resposta para o front-end.

server.get('/users', (req, res) => {
  return res.json(users)
})

server.get('/users/:index', (req, res) => {
  return res.json(req.user)
})

server.post('/users', (req, res) => {
  const { name } = req.body
  users.push(name)
  return res.json(users)
})

server.put('/users/:index', (req, res) => {
  const { index } = req.params
  const { name } = req.body

  users[index] = name
  return res.json(users)
})

server.delete('/users/:index', (req, res) => {
  const { index } = req.params

  users.splice(index, 1)

  return res.json(users)
})

server.listen(3000)
