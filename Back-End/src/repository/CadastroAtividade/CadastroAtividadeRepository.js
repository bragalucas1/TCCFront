const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const CadastroAtividadeRepository = {
  salvarAtividade: async (title, type, content, arquivoFonteBase, pdfFile) => {
    return await prisma.atividades.create({
      data: {
        nome: title,
        tipo: type,
        conteudo: content,
        caminho_pdf: pdfFile,
        caminho_codigo_base: arquivoFonteBase,
      },
    });
  },
};

module.exports = CadastroAtividadeRepository;
