import { Router } from 'express'
import { createEmployeesController, deleteEmployeesController, getEmployeesController, updateEmployeesController } from '../controllers/employeeController.js'
import { protectAdminMiddleware, protectUserMiddleware } from '../middlewares/authMiddleware.js'

const employeeRouter = Router()

employeeRouter.get('/', protectUserMiddleware, protectAdminMiddleware, getEmployeesController)
employeeRouter.post('/', protectUserMiddleware, protectAdminMiddleware, createEmployeesController)
employeeRouter.put('/:id', protectUserMiddleware, protectAdminMiddleware, updateEmployeesController)
employeeRouter.delete('/:id', protectUserMiddleware, protectAdminMiddleware, deleteEmployeesController)

export default employeeRouter
