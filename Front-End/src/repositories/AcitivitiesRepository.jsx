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
  deleteActivity: async (id, activityName) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/removerAtividade`, {
        activityName: activityName,
        id: id,
      });
      return response.data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição.");
    }
  },
  editActivity: async (formData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/editarAtividade`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição.");
    }
  },
  findActivityById: async (id) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/listarAtividadePorId`,
        { id: id }  
      );
      return response.data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição.");
    }
  },
};

export default activitiesRepository;
