import { validationResult } from 'express-validator'
import Todo from '../models/todos.model.js'
import { log } from 'console'
import {
  NotFoundError,
  RequiredFieldError,
  ValidationError
} from '../utils/errors.js'

export const getTodos = async (req, res, next) => {
  try {
    const user = req.user
    const { limit = 10, skip = 0 } = req.query
    const todos = await Todo.find({ user: user._id }).limit(limit).skip(skip)
    res.json(todos)
  } catch (error) {
    next(error)
  }
}

export const getTodo = async (req, res, next) => {
  try {
    const user = req.user
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: user._id
    }).populate('user', '_id username firstname lastname')
    if (!todo) {
      const error = new NotFoundError(
        'You are retrieving an unknown resource',
        ['No todo matches this criterion!!']
      )
      throw error
    }

    res.json(todo)
  } catch (error) {
    next(error)
  }
}

export const postTodo = async (req, res, next) => {
  try {
    const user = req.user
    const errors = validationResult(req).array()

    if (errors.length > 0) {
      const error = new ValidationError(
        'Your data has been sent not matches our validations rules',
        errors
      )
      throw error
    }

    if (!req.body.title) {
      const error = new RequiredFieldError(
        'Your data has been sent must include specific fields',
        ['title field is required']
      )
      throw error
    }

    const todo = new Todo({ ...req.body, user })
    const createdTodo = await todo.save()
    await user.updateOne({ $push: { todos: createdTodo._id } })
    res.json({ msg: 'todo created successfully' })
  } catch (error) {
    next(error)
  }
}

export const patchTodo = async (req, res, next) => {
  try {
    const user = req.user
    const errors = validationResult(req).array()

    if (errors.length > 0) {
      const error = new ValidationError(
        'Your data has been sent not matches our validations rules',
        errors
      )
      throw error
    }

    const todo = await Todo.findOne({ _id: req.params.id, user: user._id })
    if (!todo) {
      const error = new NotFoundError(
        'You are retrieving an unknown resource',
        ['No todo matches this criterion!!']
      )
      throw error
    }
    await todo.updateOne({ $set: { ...req.body } })

    res.status(200).json({ msg: 'todo updated successfully' })
  } catch (error) {
    next(error)
  }
}

export const deleteTodo = async (req, res, next) => {
  try {
    const { user } = req
    const { id } = req.params
    const todo = await Todo.findOne({ _id: id, user: user._id })
    if (!todo) {
      const error = new NotFoundError(
        'You are retrieving an unknown resource',
        ['No todo matches this criterion!!']
      )
      throw error
    }
    await user.updateOne({ $pull: { todos: todo._id } })
    await todo.deleteOne()
    res.json({ msg: 'todo deleted successfully' })
  } catch (error) {
    next(error)
  }
}
