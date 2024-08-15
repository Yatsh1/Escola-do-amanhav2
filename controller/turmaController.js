const Turma = require('../models/Turma');

// Criar uma nova turma
exports.createTurma = async (req, res) => {
    try {
        const { nome, serie, fk_escola_id } = req.body;
        const novaTurma = await Turma.create({ nome, serie, fk_escola_id });
        res.status(201).json(novaTurma);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar a turma', error });
    }
};

// Buscar todas as turmas
exports.getTurmas = async (req, res) => {
    try {
        const turmas = await Turma.findAll();
        res.status(200).json(turmas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar turmas', error });
    }
};

// Buscar uma turma por ID
exports.getTurmaById = async (req, res) => {
    try {
        const { id } = req.params;
        const turma = await Turma.findByPk(id);
        if (turma) {
            res.status(200).json(turma);
        } else {
            res.status(404).json({ message: 'Turma não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar turma', error });
    }
};

// Atualizar uma turma
exports.updateTurma = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, serie, fk_escola_id } = req.body;
        const [updated] = await Turma.update({ nome, serie, fk_escola_id }, {
            where: { id }
        });
        if (updated) {
            const updatedTurma = await Turma.findByPk(id);
            res.status(200).json(updatedTurma);
        } else {
            res.status(404).json({ message: 'Turma não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar turma', error });
    }
};

// Excluir uma turma
exports.deleteTurma = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Turma.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Turma não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir turma', error });
    }
};
