// /controllers/alunoController.js
const Aluno = require('../models/Aluno');

exports.createAluno = async (req, res) => {
    try {
        const { nome, matricula, email, telefone, endereco, fk_turma_id, fk_escola_id } = req.body;

        // Verificação se os campos obrigatórios estão presentes
        if (!nome || !matricula || !telefone) {
            return res.status(400).json({ error: 'Os campos nome, matricula e telefone são obrigatórios.' });
        }

        // Criação de um novo aluno
        const novoAluno = await Aluno.create({ nome, matricula, email, telefone, endereco, fk_turma_id, fk_escola_id });
        res.status(201).json(novoAluno);
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(500).json({ error: 'Erro ao criar aluno.' });
    }
};

exports.getAlunos = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Obtenha os parâmetros de query para paginação
        const offset = (page - 1) * limit;

        // Busca paginada dos alunos
        const { count, rows } = await Aluno.findAndCountAll({
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']], // Ordena por ID em ordem ascendente
        });

        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            data: rows,
        });
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
        res.status(500).json({ error: 'Erro ao listar alunos.' });
    }
};

exports.getAlunoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const aluno = await Aluno.findByPk(id);

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        res.status(200).json(aluno);
    } catch (error) {
        console.error('Erro ao obter aluno:', error);
        res.status(500).json({ error: 'Erro ao obter aluno.' });
    }
};

exports.updateAluno = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nome, matricula, email, telefone, endereco, fk_turma_id, fk_escola_id } = req.body;

        const aluno = await Aluno.findByPk(id);

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        aluno.nome = nome || aluno.nome;
        aluno.matricula = matricula || aluno.matricula;
        aluno.email = email || aluno.email;
        aluno.telefone = telefone || aluno.telefone;
        aluno.endereco = endereco || aluno.endereco;
        aluno.fk_turma_id = fk_turma_id || aluno.fk_turma_id;
        aluno.fk_escola_id = fk_escola_id || aluno.fk_escola_id;

        await aluno.save();

        res.status(200).json(aluno);
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ error: 'Erro ao atualizar aluno.' });
    }
};

exports.deleteAluno = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const aluno = await Aluno.findByPk(id);

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        await aluno.destroy();
        res.status(204).send(); // No Content
    } catch (error) {
        console.error('Erro ao remover aluno:', error);
        res.status(500).json({ error: 'Erro ao remover aluno.' });
    }
};
