const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ListarAtividadeRepository = {
  listarAtividades: async () => {
    return await prisma.atividades.findMany({
      select: {
        nome: true,
        tipo: true,
        conteudo: true,
        caminho_pdf: true,
      },
    });
  },
};

module.exports = ListarAtividadeRepository;
