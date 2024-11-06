const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const CorrecaoRepository = {
  atualizarSubmissao: async (userId, activityId, status) => {
    return await prisma.submissoes.upsert({
      where: {
        usuario_id_atividade_id: {
          usuario_id: userId,
          atividade_id: activityId,
        },
      },
      update: {
        status: status,
        quantidade_sub: {
          increment: 1,
        },
      },
      create: {
        usuario_id: userId,
        atividade_id: activityId,
        status: status,
        quantidade_sub: 1,
      },
    });
  },
};

module.exports = CorrecaoRepository;
