const express = require('express');
const jwt = require('jsonwebtoken');

const aplicativo = express();
aplicativo.use(express.json());

const CHAVE = '123';

aplicativo.get('/gerarToken', (requisicao, resposta) => {
    const mensagens = ['mensagem aleatória!', 'Olá Mundo!', 'Projeto JWT!', 'Back-end!'];
    const token = jwt.sign(
        { mensagem: mensagens[Math.floor(Math.random() * mensagens.length)] },
        CHAVE,
        { expiresIn: '1h' }
    );
    resposta.json({ token });
});

aplicativo.post('/decodificarToken', (requisicao, resposta) => {
    try {
        const { token } = requisicao.body;
        const decodificado = jwt.verify(token, CHAVE);
        resposta.json({ mensagem: decodificado.mensagem });
    } catch {
        resposta.status(401).json({ erro: 'Token inválido.' });
    }
});

aplicativo.listen(3000, () => console.log('Servidor rodando 3000'));
