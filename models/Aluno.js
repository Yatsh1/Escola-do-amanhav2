// /models/aluno.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Aluno = sequelize.define('Aluno', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    matricula: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true // Define a matrícula como única
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    fk_turma_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'turmas', // Nome da tabela referenciada
            key: 'id'
        }
    },
    fk_escola_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'escolas', // Nome da tabela referenciada
            key: 'id'
        }
    }
}, {
    tableName: 'alunos',
    timestamps: false // Desative se você não estiver usando createdAt/updatedAt
});

module.exports = Aluno;
