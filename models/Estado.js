const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estado = sequelize.define('Estado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sigla: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cod_uf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'estados',
  timestamps: false,
});

module.exports = Estado;
