const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Turma = sequelize.define('Turma', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serie: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fk_escola_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Escolas',
      key: 'id',
    },
  },
}, {
  tableName: 'turmas',
  timestamps: false,
});

module.exports = Turma;
