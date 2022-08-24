const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    getAllPaged,
    getById,
    create,
    updateById,
    deleteById
}

async function getAllPaged(page) {
    const currentPage = page || 0
    const listPerPage = 10
    const offset = currentPage * listPerPage

    const users = await prisma.user.findMany({
        skip: offset,
        take: listPerPage
    })

    return {
        data: users,
        meta: {page: currentPage}
    }
}

async function getById(index) {
    try {
        return await prisma.user.findUniqueOrThrow({
            where: { codigo: Number(index) }
        })
    } catch (e) {
        if (e instanceof Prisma.NotFoundError) {
            throw new Error(`Usuário com código ${index} não foi encontrado.`)
        } else {
            console.error(e.stack)
            throw e
        }
    }
}

async function create(body) {
    const { data_nascimento, email, estado, municipio, nome_completo, nome_social, sexo } = body

    return await prisma.user.create({
        data: {
            data_nascimento: new Date(data_nascimento),
            email,
            estado,
            municipio,
            nome_completo,
            nome_social,
            sexo
        }
    })
}

async function updateById(codigo, body) {
    const { email, estado, municipio, nome_completo, nome_social, numero_acessos_curso, situacao_curso } = body

    return await prisma.user.update({
        where: {
            codigo: Number(codigo),
        },
        data: {
            email: email || undefined,
            estado: estado || undefined,
            municipio: municipio || undefined,
            nome_completo: nome_completo || undefined,
            nome_social: nome_social || undefined,
            numero_acessos_curso: numero_acessos_curso || undefined,
            situacao_curso: situacao_curso || undefined
        }
    })
}

async function deleteById(codigo) {
    return await prisma.user.delete({
        where: {
            codigo: Number(codigo),
        },
    })
}

