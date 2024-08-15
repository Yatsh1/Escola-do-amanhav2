const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Autor = sequelize.define('Autor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'autores',
  timestamps: false,
});

module.exports = Autor;
