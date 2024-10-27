const path = require("path");

const CadastroAtividadeRepository = require("../../repository/CadastroAtividade/CadastroAtividadeRepository");
const CadastroAtividadeService = {
  salvarDadosAtividade: async (atividadeData) => {
    try {
      const { title, type, content } = atividadeData;
      const arquivoFonteBase = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "uploads",
        "Atividade 1",
        "teste.py"
      );
      const pdfFile = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "uploads",
        "Atividade 1",
        "teste.pdf"
      );

      await CadastroAtividadeRepository.salvarAtividade(
        title,
        type,
        content,
        arquivoFonteBase,
        pdfFile
      );
    } catch (error) {
      throw new Error("Erro ao salvar atividade no Banco: " + error.message);
    }
  },
};

module.exports = CadastroAtividadeService;
