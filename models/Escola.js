const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Escola = sequelize.define('Escola', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  razao_social: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fk_cidade_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Cidades',
      key: 'id',
    },
  },
  diretor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'escolas',
  timestamps: false,
});

module.exports = Escola;
