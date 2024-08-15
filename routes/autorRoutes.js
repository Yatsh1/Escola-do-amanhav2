const express = require('express');
const router = express.Router();
const autorController = require('../controller/autorController');

// Rota para criar um novo autor
router.post('/autores', autorController.createAutor);

// Rota para listar todos os autores
router.get('/autores', autorController.getAllAutores);

// Rota para obter um autor específico pelo ID
router.get('/autores/:id', autorController.getAutorById);

// Rota para atualizar um autor existente pelo ID
router.put('/autores/:id', autorController.updateAutor);

// Rota para remover um autor existente pelo ID
router.delete('/autores/:id', autorController.deleteAutor);

module.exports = router;