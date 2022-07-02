import { Router } from "express";
import {
  createUserCtrl,
  deleteUserByIdCtrl,
  getUserByIdCtrl,
  listAllUsersCtrl,
  patchUserByIdCtrl,
} from "../../controllers/user.ctrl";
import checkUserExistenceByIdMw from "../../middlewares/checkUserExistenceById.mw";
import {
  createUserSchema,
  validateCreateUserMw,
} from "../../middlewares/validateCreateUser.mw";

const routes = Router();

routes.post("/", validateCreateUserMw(createUserSchema), createUserCtrl);
routes.get("/", listAllUsersCtrl);
routes.get("/:id", checkUserExistenceByIdMw, getUserByIdCtrl);
routes.patch("/:id", checkUserExistenceByIdMw, patchUserByIdCtrl);
routes.delete("/:id", checkUserExistenceByIdMw, deleteUserByIdCtrl);

export default routes;
