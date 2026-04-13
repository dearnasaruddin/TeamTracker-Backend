import { Router } from 'express'
import { createEmployeesController, deleteEmployeesController, getEmployeesController, updateEmployeesController } from '../controllers/employeeController.js'
import { protectAdminMiddleware } from '../middlewares/authMiddleware.js'

const employeeRouter = Router()

employeeRouter.get('/', protectAdminMiddleware, getEmployeesController)
employeeRouter.post('/', protectAdminMiddleware, createEmployeesController)
employeeRouter.put('/:id', protectAdminMiddleware, updateEmployeesController)
employeeRouter.delete('/:id', protectAdminMiddleware, deleteEmployeesController)

export default employeeRouter
