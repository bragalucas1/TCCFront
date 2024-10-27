const cors = require('cors');
const express = require('express');
const prisma = require('../database/prismaClient'); // Corrigido para ir um nível acima
const usuarioRota = require('../routes/UsuariosRotas');
const authRoute = require('../routes/AutenticacaoRotas');
const correctRoute = require('../routes/CorrecaoRotas');
const cadastroAtividadeRoute = require('../routes/CadastroAtividadeRotas');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

prisma.$connect()
    .then(() => {
        console.log('Banco de dados conectado com sucesso!'); // Log de sucesso
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error); // Log de erro
    });

app.use(authRoute);
app.use(usuarioRota); 
app.use(correctRoute);
app.use(cadastroAtividadeRoute)

module.exports = app;
