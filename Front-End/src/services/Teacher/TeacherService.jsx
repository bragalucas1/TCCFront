import teacherRepository from "../../repositories/TeacherRepository";

const TeacherService = {
  getAllStudents: async () => {
    try {
      const data = await teacherRepository.getAllStudents();
      return data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição");
    }
  },
  editStudent: async (student) => {
    try {
      const data = await teacherRepository.editStudent(student);
      return data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição");
    }
  },
  removeStudent: async (student) => {
    try {
      const data = await teacherRepository.removeStudent(student);
      return data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição");
    }
  },
  addStudent: async (student) => {
    try {
      const data = await teacherRepository.addStudent(student);
      return data;
    } catch (error) {
      throw new Error("Falha ao enviar requisição");
    }
  },
};

export default TeacherService;
