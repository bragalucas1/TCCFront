import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const teacherRepository = {
  getAllStudents: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listarAlunos`);
      return response.data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição.");
    }
  },
  editStudent: async (student) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/editarAluno`, student);
      return response.data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição.");
    }
  },
  removeStudent: async (student) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/removerAluno`,
        student
      );
      return response.data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição.");
    }
  },
  addStudent: async (student) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cadastrarAluno`,
        student
      );
      return response.data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição.");
    }
  },
};

export default teacherRepository;
