const CadastroAtividadeService = require("../../services/CadastroAtividade/CadastroAtividadeService");

const CadastroAtividadeController = {
  salvarDadosAtividade: async (req, res) => {
    try {
      const { title, type, content } = req.body;
      const atividadeData = { title, type, content };

      await CadastroAtividadeService.salvarDadosAtividade(atividadeData);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro ao cadastro da atividade." });
    }
  },
};

module.exports = CadastroAtividadeController;
