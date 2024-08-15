// /controllers/funcaoController.js
const Funcao = require('../models/Funcao');

exports.createFuncao = async (req, res) => {
    try {
        const { descricao } = req.body;

        // Verificação se o campo obrigatório está presente
        if (!descricao) {
            return res.status(400).json({ error: 'O campo descricao é obrigatório.' });
        }

        // Criação de uma nova função
        const novaFuncao = await Funcao.create({ descricao });
        res.status(201).json(novaFuncao);
    } catch (error) {
        console.error('Erro ao criar função:', error);
        res.status(500).json({ error: 'Erro ao criar função.' });
    }
};

// Lista todas as funções
exports.getFuncoes = async (req, res) => {
    try {
        const funcoes = await Funcao.findAll();
        res.status(200).json(funcoes);
        console.log(funcoes)
    } catch (error) {
        console.error('Erro ao listar funções:', error);
        res.status(500).json({ error: 'Erro ao listar funções.' });
    }
};

// Obtém uma função específica pelo ID
exports.getFuncaoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const funcao = await Funcao.findByPk(id);

        if (!funcao) {
            return res.status(404).json({ error: 'Função não encontrada.' });
        }

        res.status(200).json(funcao);
    } catch (error) {
        console.error('Erro ao obter função:', error);
        res.status(500).json({ error: 'Erro ao obter função.' });
    }
};

// Atualiza uma função existente pelo ID
exports.updateFuncao = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { descricao } = req.body;

        const funcao = await Funcao.findByPk(id);

        if (!funcao) {
            return res.status(404).json({ error: 'Função não encontrada.' });
        }

        funcao.descricao = descricao || funcao.descricao;
        await funcao.save();

        res.status(200).json(funcao);
    } catch (error) {
        console.error('Erro ao atualizar função:', error);
        res.status(500).json({ error: 'Erro ao atualizar função.' });
    }
};

// Remove uma função existente pelo ID
exports.deleteFuncao = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const funcao = await Funcao.findByPk(id);

        if (!funcao) {
            return res.status(404).json({ error: 'Função não encontrada.' });
        }

        await funcao.destroy();
        res.status(204).send(); // No Content
    } catch (error) {
        console.error('Erro ao remover função:', error);
        res.status(500).json({ error: 'Erro ao remover função.' });
    }
};
