const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmprestimoLivro = sequelize.define('EmprestimoLivro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fk_livro_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Livros',
      key: 'id',
    },
  },
  fk_aluno_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Alunos',
      key: 'id',
    },
  },
  data_emprestimo: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  data_devolucao: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'emprestimos_livros',
  timestamps: false,
});

module.exports = EmprestimoLivro;
