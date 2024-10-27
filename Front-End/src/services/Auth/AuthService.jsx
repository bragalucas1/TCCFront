import authRepository from "../../repositories/AuthRepository";

const AuthService = {
    authenticate: async (matricula, senha) => {
        try {
            const data = await authRepository.authenticate(matricula, senha);
             
            return data.success;
        } catch (error) {
            throw new Error('Falha ao fazer login');
        }
    },
};

export default AuthService;