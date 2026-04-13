import {Router} from 'express'
import { getProfileController, updateProfileController } from '../controllers/profileController.js'
import { protectUserMiddleware } from '../middlewares/authMiddleware.js'

const profileRouter = Router()

profileRouter.get('/', protectUserMiddleware, getProfileController)
profileRouter.put('/', protectUserMiddleware, updateProfileController)

export default profileRouter