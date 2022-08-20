const express = require('express')
const server = express()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//req ➔ representa todos os dados da requisição que o cliente faz
//res ➔ todas as informações necessárias para informar uma resposta para o front-end.

server.use(express.json())
server.listen(3000)


server.get('/users', async (req, res) => {
  const currentPage = req.query.page || 0
  const listPerPage = 5
  const offset = currentPage * listPerPage

  const users = await prisma.user.findMany({
    skip: offset,
    take: listPerPage
  })

  users.forEach(user => {
    user.codigo = Number(user.codigo.toString())
  })

  return res.json({
    data: users,
    meta: { page: currentPage }
  })
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