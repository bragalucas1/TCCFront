const express = require('express');
const cadastroAtividadeRoute = express.Router();
const upload = require('../config/multerConfig');
const CadastroAtividadeController = require('../controllers/CadastroAtividade/CadastroAtividadeController');

cadastroAtividadeRoute.post(
    '/cadastroAtividade',
    upload.fields([
      { name: 'pdfFile', maxCount: 1 },
      { name: 'sourceCodeFile', maxCount: 1 }
    ]), 
    CadastroAtividadeController.salvarDadosAtividade
  );
  
module.exports = cadastroAtividadeRoute;
