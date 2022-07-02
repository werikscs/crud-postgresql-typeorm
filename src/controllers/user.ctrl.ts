import { Console } from "console";
import { Request, Response } from "express";
import createUserSvc from "../services/users/createUser.svc";
import deleteUserByIdSvc from "../services/users/deleteUserById.svc";
import getUserByIdSvc from "../services/users/getUserById.svc";
import listAllUsersSvc from "../services/users/listAllUsers.svc";
import patchUserByIdSvc from "../services/users/patchUserById.svc";

export const createUserCtrl = async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.newUser;
    const user = await createUserSvc({ name, email, password, age });
    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export const listAllUsersCtrl = async (req: Request, res: Response) => {
  try {
    const allUsers = await listAllUsersSvc();
    return res.status(200).json(allUsers);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export const getUserByIdCtrl = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const userById = await getUserByIdSvc(user);
    return res.status(200).json(userById);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export const patchUserByIdCtrl = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const userNewData = req.body;
    await patchUserByIdSvc(user, userNewData);

    return res.status(200).json({
      message: "User updated",
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export const deleteUserByIdCtrl = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    await deleteUserByIdSvc(user);

    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};
