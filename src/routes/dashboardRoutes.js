import { Router } from "express";
import { protectUserMiddleware } from "../middlewares/authMiddleware.js";
import { getDashboardController } from "../controllers/dashboardController";

const dashboardRouter = Router()

dashboardRouter.get('/', protectUserMiddleware, getDashboardController)

export default dashboardRouter