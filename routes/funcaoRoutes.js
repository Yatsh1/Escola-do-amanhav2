const express = require('express');
const router = express.Router();
const funcaoController = require('../controller/funcaoController');

// Rota para criar uma nova função
router.post('/funcoes', funcaoController.createFuncao);

// Rota para listar todas as funções
router.get('/funcoes', funcaoController.getFuncoes);

// Rota para obter uma função específica pelo ID
router.get('/funcoes/:id', funcaoController.getFuncaoById);

// Rota para atualizar uma função existente pelo ID
router.put('/funcoes/:id', funcaoController.updateFuncao);

// Rota para remover uma função existente pelo ID
router.delete('/funcoes/:id', funcaoController.deleteFuncao);

module.exports = router;
