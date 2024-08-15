const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genero = sequelize.define('Genero', {
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
  tableName: 'generos',
  timestamps: false,
});

module.exports = Genero;
