import { Request, Response, NextFunction } from "express";
import { ICreateUser } from "../interfaces/user";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const createUserSchema: SchemaOf<ICreateUser> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  age: yup.number().required(),
});

export const validateCreateUserMw =
  (schema: SchemaOf<ICreateUser>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataBody = req.body;

      try {
        const validateData = await schema.validate(dataBody, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newUser = validateData;

        next();
      } catch (err: any) {
        return res.status(400).json({
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
