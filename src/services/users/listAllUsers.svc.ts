import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const listAllUsersSvc = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const allUsers = await userRepository.find();

  return instanceToInstance(allUsers);
};

export default listAllUsersSvc;
