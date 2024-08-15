const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para servir o formulário de login
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

// Rota para processar o login
router.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    // Lógica de autenticação
    if (usuario === 'admin' && senha === '1234') {
        res.redirect('/home');
    } else {
        // Aqui você pode redirecionar de volta para a página de login com um parâmetro de erro ou exibir uma mensagem de erro
        res.redirect('/?error=invalid'); // Você pode tratar esse parâmetro na página de login
    }
});

module.exports = router;
