import { Router } from "express";
import { protectUserMiddleware } from "../middlewares/authMiddleware.js";
import { createLeaveController, getLeavesController, updateLeaveStatusController } from "../controllers/leaveController.js";

const leaveRouter = Router()

leaveRouter.post('/', protectUserMiddleware, createLeaveController)
leaveRouter.get('/', protectUserMiddleware, getLeavesController)
leaveRouter.patch('/:id', protectUserMiddleware, updateLeaveStatusController)

export default leaveRouter