const Autor = require('../models/Autor');

// Cria um novo autor
exports.createAutor = async (req, res) => {
  try {
    const { nome } = req.body;
    const novoAutor = await Autor.create({ nome });
    res.status(201).json(novoAutor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o autor' });
  }
};

// Retorna todos os autores
exports.getAllAutores = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Pega a página e o limite dos parâmetros de query

  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Autor.findAndCountAll({
      offset: offset,
      limit: parseInt(limit),
      order: [['id', 'ASC']] // Ordena por ID em ordem ascendente
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows
    });
  } catch (error) {
    console.error('Erro ao obter autores:', error);
    res.status(500).json({ message: 'Erro ao obter autores.' });
  }
};

// Retorna um autor específico por ID
exports.getAutorById = async (req, res) => {
  try {
    const { id } = req.params;
    const autor = await Autor.findByPk(id);
    if (autor) {
      res.status(200).json(autor);
    } else {
      res.status(404).json({ error: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o autor' });
  }
};

// Atualiza um autor por ID
exports.updateAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    const autor = await Autor.findByPk(id);
    if (autor) {
      autor.nome = nome;
      await autor.save();
      res.status(200).json(autor);
    } else {
      res.status(404).json({ error: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o autor' });
  }
};

// Exclui um autor por ID
exports.deleteAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const autor = await Autor.findByPk(id);
    if (autor) {
      await autor.destroy();
      res.status(200).json({ message: 'Autor excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o autor' });
  }
};