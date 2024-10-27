const ListarAtividadeRepository = require("../../repository/ListarAtividade/ListarAtividadeRepository");

const ListarAtividadesService = {
  listarAtividades: async () => {
    try {
      const atividades = await ListarAtividadeRepository.listarAtividades();
      return atividades;
    } catch (error) {
      throw new Error("Erro ao listar atividades no Banco: " + error.message);
    }
  },
};

module.exports = ListarAtividadesService;
