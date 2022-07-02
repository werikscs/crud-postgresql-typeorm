import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { ICreateUser } from "../../interfaces/user";

const patchUserByIdSvc = async (
  user: User,
  userNewData: ICreateUser
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const userUpdated = await userRepository.save({ ...user, ...userNewData });

  const userCasted = Object.assign(new User(), userUpdated);

  return instanceToInstance(userCasted);
};

export default patchUserByIdSvc;
