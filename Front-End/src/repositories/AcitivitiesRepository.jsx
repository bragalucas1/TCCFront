import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const activitiesRepository = {
  getAllActivities: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listarAtividades`);
      return response.data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição.");
    }
  },
};

export default activitiesRepository;
