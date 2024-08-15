const express = require('express');
const router = express.Router();
const alunoController = require('../controller/alunoController');

// Rota para criar um novo aluno
router.post('/alunos', alunoController.createAluno);

// Rota para listar todos os alunos
router.get('/alunos', alunoController.getAlunos);

// Rota para obter um aluno específico pelo ID
router.get('/alunos/:id', alunoController.getAlunoById);

// Rota para atualizar um aluno existente pelo ID
router.put('/alunos/:id', alunoController.updateAluno);

// Rota para remover um aluno existente pelo ID
router.delete('/alunos/:id', alunoController.deleteAluno);

module.exports = router;
