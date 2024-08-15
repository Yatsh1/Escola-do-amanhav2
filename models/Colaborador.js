const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Colaborador = sequelize.define('Colaborador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  fk_escola_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Escolas',
      key: 'id',
    },
  },
  fk_funcao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Funcoes',
      key: 'id',
    },
  },
}, {
  tableName: 'colaboradores',
  timestamps: false,
});

module.exports = Colaborador;
