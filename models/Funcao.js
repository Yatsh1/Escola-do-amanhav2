const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Funcao = sequelize.define('Funcao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'funcoes',
  timestamps: false,
});

module.exports = Funcao;
