import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fileRepository = {
  send: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/correcao`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Falha ao enviar arquivo.");
    }
  },
  sendFileFromProfessor: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/atividade`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Falha ao enviar arquivo.");
    }
  }
};

export default fileRepository;
