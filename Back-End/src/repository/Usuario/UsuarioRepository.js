const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const UsuarioRepository = {
    findMany: async () => {
        return await prisma.usuarios.findMany(); 
    },
    findByMatriculaAndSenha: async (matricula, senha) => {
        return await prisma.usuarios.findFirst({
            where: {
                matricula: matricula,
                senha: senha
            }
        });
    }
};

module.exports = UsuarioRepository; // Exporta o repositório
