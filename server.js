// Import the framework and instantiate it
import Fastify from 'fastify'
import { DataBaseTemp } from "./db.list.js";

const server = Fastify({
    logger: true
})
const db = new DataBaseTemp();
const HOST = 'localhost'; //127.0.0.1

const PORT = 3000;

// Declare a route
server.get('/', async (req, res) => {
    res.send(' Servidor no ar!')
});




server.get(`/produtos`, (req, res) => {
    let produtos = db.listarTodos()
    res.status(200).send({
        size: produtos.length,
        data: produtos
    })

})

server.get(`/produto/:id`, (req, res) => {
    let idParam = req.params.id
    let produto = db.listarPorId(idParam)
    return res.status(200).send(produto)
})

server.post('/produto', (req, res) => {
    let produto = {
        nome: "Nike",
        modelo: "Air Force",
        preço: 1400,
    }
    db.adicionar(produto);
    res.status(201).send(produto)
})

server.put('/produto/:id', (req, res) => {
    const idParam = req.params.id;
    console.log('objetos com valores atualizados', req.body)
    const produto = req.body
})

server.listen({
    port: PORT,
    host: HOST
})

    .then(() => console.log(`Servidor rodando em http://${HOST}:${PORT}`))
    .catch(err => console.log(`Erro ao subir o servidor: ${err}`))

