const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Editora = sequelize.define('Editora', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  razao_social: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'editoras',
  timestamps: false,
});

module.exports = Editora;
