const { Sequelize } = require('sequelize');

// Configurações da conexão
const sequelize = new Sequelize('csa', 'developer', '159357Te1128*', {
    host: "177.67.203.7",
    dialect: 'mysql',
    port: 3306,
    logging: false, // Altere para 'true' para logs detalhados
});

// Testar a conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

module.exports = sequelize