import { Router } from "express";
import { changePasswordController, loginController, sessionController } from "../controllers/authController.js";
import { protectUserMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = Router()

authRouter.post('/login', loginController)
authRouter.get('/session', protectUserMiddleware, sessionController)
authRouter.post('/change-password', protectUserMiddleware, changePasswordController)

export default authRouter