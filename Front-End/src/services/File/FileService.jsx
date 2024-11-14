import fileRepository from "../../repositories/FileRepository";

const FileService = {
  sendFile: async (formData) => {
    try {
      const data = await fileRepository.send(formData);
      return data;
    } catch (error) {
      throw new Error("Falha ao enviar arquivo");
    }
  },
  uploadActivityFile: async (formData) => {
    try {
      const data = await fileRepository.sendFileFromProfessor(formData);
      return data.success;
    } catch (error) {
      throw new Error("Falha ao enviar arquivo");
    }
  },
  sendFileToSaveStudents: async (formData) => {
    try {
      const data = await fileRepository.sendFileToSaveStudents(formData);
      return data;
    } catch (error) {
      throw new Error("Falha ao enviar arquivo");
    }
  },
};

export default FileService;
