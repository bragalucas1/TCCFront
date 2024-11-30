import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const activitiesRepository = {
  getAllActivities: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listarAtividades`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição.");
    }
  },
  getAllActivitiesTeacher: async () => {
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
  getPdfActivity: async (activityName) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/obterPdf`, {
        params: { activityName },
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      });

      if (response.data.type === "application/pdf") {
        return response.data;
      } else {
        const text = await response.data.text();
        throw new Error(JSON.parse(text).error || "Erro ao obter PDF");
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);
      throw new Error(error.response?.data?.error || "Falha ao obter PDF");
    }
  },
};

export default activitiesRepository;
