import { Router } from 'express'
import { checkSchema } from 'express-validator'

import {
  deleteUser,
  getUserTodos,
  getUsers,
  loginUser,
  patchUser,
  registerUser
} from '../controllers/user.controller.js'

import { auth } from '../middlewares/auth.middleware.js'
import regsiterationSchema from '../validations/regsiteration.schema.js'
import loginSchema from '../validations/login.schema.js'

const router = Router()

router.post('/register', checkSchema(regsiterationSchema), registerUser)
router.post('/login', checkSchema(loginSchema), loginUser)

router.get('/users', getUsers)
router.get('/users/:uid/todos', getUserTodos)
router.delete('/users', auth, deleteUser)
router.patch('/users', auth, patchUser)

export default router
