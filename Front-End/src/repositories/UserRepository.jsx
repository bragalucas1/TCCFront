import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserRepository = {
  getUserNamesFromIds: async (ids) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/listarPorID`, {
        ids,
      });
      return response.data;
    } catch (error) {
      throw new Error("Falha ao fazer login");
    }
  },
};

export default UserRepository;
