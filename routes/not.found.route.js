import { Router } from 'express'

const router = Router()

router.get('*', (req, res, next) => {
  const error = new NotFoundError('You are trying route to nowhere', ['invalid route path'])
  next(error)
})

export default router
