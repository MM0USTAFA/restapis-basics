import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { auth } from '../middlewares/auth.middleware.js'
import {
  deleteTodo,
  getTodo,
  getTodos,
  patchTodo,
  postTodo
} from '../controllers/todo.controller.js'
import postTodoSchema from '../validations/todo.post.schema.js'
import patchTodoSchema from '../validations/todo.patch.schema.js'

const router = Router()

router.get('/todos', auth, getTodos)
router.get('/todos/:id', auth, getTodo)
router.post('/todos', auth, checkSchema(postTodoSchema), postTodo)
router.patch('/todos/:id', auth, checkSchema(patchTodoSchema), patchTodo)
router.delete('/todos/:id', auth, deleteTodo)

export default router
