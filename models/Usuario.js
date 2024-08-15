const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fk_funcao_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Funcoes',
      key: 'id',
    },
  },
  fk_escola_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Escolas',
      key: 'id',
    },
  },
  fk_colaborador_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Colaboradores',
      key: 'id',
    },
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = Usuario;
