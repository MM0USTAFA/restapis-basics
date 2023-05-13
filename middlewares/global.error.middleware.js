import { ClientError, UnexpectedError } from "../utils/errors.js"

export default (error, req, res, next) => {
  if (error instanceof ClientError) {
    res.status(error.status).json({ ...error })
    return
  }
  const unexpectedError = new UnexpectedError([error.message])
  res.status(unexpectedError.status).json({ ...unexpectedError })
}