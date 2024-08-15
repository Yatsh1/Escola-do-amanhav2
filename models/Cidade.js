const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cidade = sequelize.define('Cidade', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fk_estado_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Estados',
      key: 'id',
    },
  },
}, {
  tableName: 'cidades',
  timestamps: false,
});

module.exports = Cidade;
