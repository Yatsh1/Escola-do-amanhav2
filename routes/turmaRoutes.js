const express = require('express');
const router = express.Router();
const turmasController = require('../controller/turmaController');

router.post('/turmas', turmasController.createTurma);
router.get('/turmas', turmasController.getTurmas);
router.get('/turmas/:id', turmasController.getTurmaById);
router.put('/turmas/:id', turmasController.updateTurma);
router.delete('/turmas/:id', turmasController.deleteTurma);

module.exports = router;
