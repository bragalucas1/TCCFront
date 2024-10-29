const CorrecaoService = require("../../services/Correcao/CorrecaoService");

const CorrecaoController = {
  corrigir: async (req, res) => {
    try {
      const resultado = await CorrecaoService.fluxoDeCorrecao(req.file);
      res.status(200).json({ success: resultado.correto });
    } catch (error) {
      res.status(500).json({ error: "Erro ao realizar correção." });
    }
  },
};

module.exports = CorrecaoController;
