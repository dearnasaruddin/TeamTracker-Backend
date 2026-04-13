import { Router } from "express";
import { protectUserMiddleware } from "../middlewares/authMiddleware.js";
import { clockInOutController, getAttendanceController } from "../controllers/attendanceController.js";

const attendanceRouter = Router()

attendanceRouter.post('/', protectUserMiddleware, clockInOutController)
attendanceRouter.get('/', protectUserMiddleware, getAttendanceController)

export default attendanceRouter