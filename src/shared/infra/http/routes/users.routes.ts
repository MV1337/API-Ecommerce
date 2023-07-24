import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListAllUsersController } from "@modules/accounts/useCases/listAllUsers/ListAllUsersController";
import { Router } from "express";
import { ConfirmEmailController } from "@modules/accounts/useCases/confirmEmail/ConfirmEmailController";
import { ListUserInfoController } from "@modules/accounts/useCases/listUserInfo/listUserInfoController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();
const confirmEmailController = new ConfirmEmailController();
const listUserInfoController = new ListUserInfoController()

usersRoutes.get("/", listAllUsersController.handle);
usersRoutes.get("/user", ensureAuthenticated, listUserInfoController.handle)
usersRoutes.get(
  "/confirm/:confirmationEmailToken",
  confirmEmailController.handle
);
usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
