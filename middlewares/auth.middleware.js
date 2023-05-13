import jwt from 'jsonwebtoken'
import User from '../models/users.model.js'
import { UnauthorizedError } from '../utils/errors.js'

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '')

    const decoded = jwt.verify(token, process.env.PRIVATE_SECRET_KEY)

    const user = await User.findOne({ _id: decoded.id , token })

    if (!user) {
      const error = new UnauthorizedError('Your credentials are not valid', [
        'invalid credentials'
      ])
      throw error
    }

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
