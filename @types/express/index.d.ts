import * as express from "express";
import { User } from "../../src/entities/user.entity";
import { ICreateUser } from "../../src/interfaces/user";

declare global {
  namespace Express {
    interface Request {
      newUser: ICreateUser;
      user: User;
    }
  }
}
