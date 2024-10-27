const CadastroAtividadeService = require("../../services/Atividade/CadastroAtividadeService");
const ListarAtividadesService = require("../../services/Atividade/ListarAtividadesService");

const AtividadeController = {
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
  listarAtividades: async (req, res) => {
    try {
      console.log("Listar At");
      const atividades = await ListarAtividadesService.listarAtividades();
      console.log("123");
      res.status(200).json({ success: true, atividades });
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar atividades." });
    }
  },
};

module.exports = AtividadeController;
