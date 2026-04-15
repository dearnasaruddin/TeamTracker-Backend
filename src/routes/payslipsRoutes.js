import { Router } from "express";
import { protectAdminMiddleware, protectUserMiddleware } from "../middlewares/authMiddleware.js";
import { createPayslipController, getPayslipsByIdController, getPayslipsController } from "../controllers/payslipController.js";

const payslipRouter = Router()

payslipRouter.post('/', protectUserMiddleware, protectAdminMiddleware, createPayslipController)
payslipRouter.get('/', protectUserMiddleware, getPayslipsController)
payslipRouter.get('/:id', protectUserMiddleware, getPayslipsByIdController)

export default payslipRouter