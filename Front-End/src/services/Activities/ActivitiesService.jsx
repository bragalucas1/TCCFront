import activitiesRepository from "../../repositories/AcitivitiesRepository";

const ActivitiesService = {
  getAllActivities: async () => {
    try {
      const data = await activitiesRepository.getAllActivities();
      return data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição");
    }
  },
};

export default ActivitiesService;
