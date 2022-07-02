import AppDataSource from "../../data-source";
import bcrypt from "bcryptjs";
import { User } from "../../entities/user.entity";
import { ICreateUser } from "../../interfaces/user";
import { instanceToInstance } from "class-transformer";

const createUserSvc = async ({
  name,
  email,
  password,
  age,
}: ICreateUser): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const usersArray = await userRepository.find();

  const emailAlreadyExists = usersArray.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new Error("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    name,
    email,
    age,
    password: hashedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await userRepository.save(newUser);

  return instanceToInstance(newUser);
};

export default createUserSvc;
