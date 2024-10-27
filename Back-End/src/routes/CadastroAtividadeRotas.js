const express = require('express');
const atividadeRoute = express.Router();
const upload = require('../config/multerConfig');
const AtividadeController = require('../controllers/Atividade/AtividadeController');

atividadeRoute.post(
    '/cadastroAtividade',
    upload.fields([
      { name: 'pdfFile', maxCount: 1 },
      { name: 'sourceCodeFile', maxCount: 1 }
    ]), 
    AtividadeController.salvarDadosAtividade
  );
  
atividadeRoute.get('/listarAtividades', AtividadeController.listarAtividades);
  
module.exports = atividadeRoute;
