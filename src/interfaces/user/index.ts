export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface IUserWithoutPassword {
  id: string;
  name: string;
  email: string;
  age: number;
  created_at: string;
  updated_at: string;
}
