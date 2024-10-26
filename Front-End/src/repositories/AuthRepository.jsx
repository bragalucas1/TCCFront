import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const authRepository = {
    authenticate: async (matricula, senha) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { matricula, senha });
            return response.data;
        } catch (error) {
            throw new Error('Falha ao fazer login');
        }
    }
}

export default authRepository;