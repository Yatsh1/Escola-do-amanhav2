const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Livro = sequelize.define('Livro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fk_autor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Autores',
      key: 'id',
    },
  },
  fk_genero_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Generos',
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
  fk_editora_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Editoras',
      key: 'id',
    },
  },
}, {
  tableName: 'livros',
  timestamps: false,
});

module.exports = Livro;
