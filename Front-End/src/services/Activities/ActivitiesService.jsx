import activitiesRepository from "../../repositories/AcitivitiesRepository";

const ActivitiesService = {
  getAllActivities: async () => {
    try {
      const data = await activitiesRepository.getAllActivities();
      return data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição para obter atividades.");
    }
  },
  deleteActivity: async (id, activityName) => {
    try {
      console.log(id, activityName);
      const data = await activitiesRepository.deleteActivity(id, activityName);
      return data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição para deletar atividade.");
    }
  },
  editActivity: async (formData) => {
    try {
      const data = await activitiesRepository.editActivity(formData);
      return data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição para editar atividade.");
    }
  },
  findActivityById: async (id) => {
    try {
      const data = await activitiesRepository.findActivityById(id);
      return data;
    } catch (error) {
      throw new Error(
        "Falha ao enviar requisição para encontrar atividade pelo id."
      );
    }
  },
};

export default ActivitiesService;
