import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import User from '../models/users.model.js'
import Todo from '../models/todos.model.js'
import { log } from 'console'
import { NotFoundError, UnauthorizedError, ValidationError } from '../utils/errors.js'

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req).array()

    if (errors.length > 0) {
      const error = new ValidationError(
        'Your data has been sent not matches our validations rules',
        errors
      )
      throw error
    }

    const user = new User(req.body)
    const createdUser = await user.save()

    res.status(201).json({ msg: 'user created successfully' })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const errors = validationResult(req).array()

    if (errors.length > 0) {
      const error = new ValidationError(
        'Your data has been sent not matches our validations rules',
        errors
      )
      throw error
    }

    const user = await User.findOne({ username })
    if (!user) {
      const error = new UnauthorizedError('Your credentials are not valid', [
        'invalid username or password'
      ])
      throw error
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      const error = new UnauthorizedError('Your credentials are not valid', [
        'invalid username or password'
      ])
      throw error
    }

    const token = jwt.sign(
      { id: user._id, username, iat: Date.now() },
      process.env.PRIVATE_SECRET_KEY,
      { expiresIn: '1y' }
    )

    await user.updateOne({token}, {upsert: true})

    res.json({ token })
  } catch (error) {
    next(error)
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    const mappedUsers = users.map((user) => {
      delete user.password
      delete user.token
      return user
    })
    res.json(mappedUsers)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      const error = new UnauthorizedError('Your credentials are not valid', [
        'invalid credentials'
      ])
      throw error
    }

    await Todo.deleteMany({_id: {$in: user.todos}})
    await user.deleteOne()
    res.json({ msg: 'user deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export const patchUser = async (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      const error = new UnauthorizedError('Your credentials are not valid', [
        'invalid credentials'
      ])
      throw error
    }

    await user.updateOne({ $set: { ...req.body } }, { upsert: true })
    res.json({ msg: 'user updated successfully' })
  } catch (error) {
    next(error)
  }
}

export const getUserTodos = async (req, res, next) => {
  try {
    const {uid} = req.params
    const user = await User.findById(uid).populate('todos')
    if(!user){
      const error = new NotFoundError('No resources match this criteria', ['invalid user id'])
      throw error
    }
    res.json(user.todos)
  } catch (error) {
    next(error)
  }
}
