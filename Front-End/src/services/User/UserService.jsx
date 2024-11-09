import UserRepository from "../../repositories/UserRepository";

const UserService = {
  getUserNamesFromIds: async (ids) => {
    try {
      const data = await UserRepository.getUserNamesFromIds(ids);
      return data;
    } catch (error) {
      throw new Error("Falha ao fazer login");
    }
  },
};

export default UserService;
