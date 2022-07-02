import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const deleteUserByIdSvc = async (user: User): Promise<User> => {
  const userId = user.id;
  const userRepository = AppDataSource.getRepository(User);

  await userRepository.delete({ id: userId });

  return instanceToInstance(user);
};

export default deleteUserByIdSvc;
