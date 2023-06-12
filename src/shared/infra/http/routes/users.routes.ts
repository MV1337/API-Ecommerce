import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListAllUsersController } from "@modules/accounts/useCases/listAllUsers/ListAllUsersController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ConfirmEmailController } from "@modules/accounts/useCases/confirmEmail/ConfirmEmailController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();
const confirmEmailController = new ConfirmEmailController()

usersRoutes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  listAllUsersController.handle
);
usersRoutes.get("/confirm/:confirmationEmailToken", confirmEmailController.handle)
usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
