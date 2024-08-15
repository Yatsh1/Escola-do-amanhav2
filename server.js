require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/database');
const formRoute = require('./routes/formRoutes');
const homeRoute = require('./routes/homeRoute');
const funcaoRoute = require('./routes/funcaoRoutes');
const alunoRoute = require("./routes/alunoRoutes");
const turmaRoute = require("./routes/turmaRoutes");
const autorRoutes = require("./routes/autorRoutes");
const logger = require('./config/terminal.log');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para lidar com JSON no corpo das requisições
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', formRoute);
app.use('/', homeRoute);
app.use('/api', funcaoRoute);
app.use('/api', alunoRoute);
app.use('/api', autorRoutes);
app.use('/api', turmaRoute);

// Servir o arquivo home.html diretamente
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


// Servir o template home.html
app.get('/templates/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates', 'home.html'));
});

// Conexão com o banco de dados
sequelize.sync({ alter: false })
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
    })
    .catch(err => {
        console.error('Erro ao sincronizar modelos:', err);
    });

app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);

    setTimeout(() => {
        logger.log();
    }, 2000);
});
