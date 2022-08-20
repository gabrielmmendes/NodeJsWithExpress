const express = require('express')
const server = express()
const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

//req ➔ representa todos os dados da requisição que o cliente faz
//res ➔ todas as informações necessárias para informar uma resposta para o front-end.

server.use(express.json())
server.listen(3000)


server.get('/users', async (req, res) => {
  const currentPage = req.query.page || 0
  const listPerPage = 10
  const offset = currentPage * listPerPage

  const users = await prisma.user.findMany({
    skip: offset,
    take: listPerPage
  })

  res.json({
    data: users,
    meta: { page: currentPage }
  })
})

server.get('/users/:index', async (req, res) => {
  const { index } = req.params

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {codigo: Number(index)},
    })
    res.json(user)
  } catch (e) {
    if (e instanceof Prisma.NotFoundError) {
      res.json({erro: `Usuário com código ${index} não foi encontrado.`})
    } else {
      console.error(e.stack);
      res.sendStatus(500).send('Internal Server Error')
    }
  }
})

server.post('/users', (req, res) => {
  const { name } = req.body
  users.push(name)
  res.json(users)
})

server.put('/users/:index', (req, res) => {
  const { index } = req.params
  const { name } = req.body

  users[index] = name
  res.json(users)
})

server.delete('/users/:index', (req, res) => {
  const { index } = req.params

  users.splice(index, 1)

  res.json(users)
})