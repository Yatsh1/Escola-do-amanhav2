const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EntradaSaidaAluno = sequelize.define('EntradaSaidaAluno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fk_aluno_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Alunos',
      key: 'id',
    },
  },
  data_hora_entrada: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_hora_saida: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'entradas_saidas_alunos',
  timestamps: false,
});

module.exports = EntradaSaidaAluno;
