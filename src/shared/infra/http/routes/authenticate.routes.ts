
import { AuthenticateUserController } from "@modules/accounts/useCases/loginUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

const authenticateRoutes = Router()

authenticateRoutes.post("/login", authenticateUserController.handle)
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export {authenticateRoutes}