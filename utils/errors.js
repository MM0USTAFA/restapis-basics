export class ClientError extends Error {
  constructor(message, status, type, cause) {
    super(message)
    this.type = type
    this.status = status
    this.cause = cause
  }
}
export class ValidationError extends ClientError {
  constructor(message, cause) {
    super(message, 400, 'ValidationError', cause)
  }
}

export class NotFoundError extends ClientError {
  constructor(message, cause) {
    super(message, 404, 'NotFoundError', cause)
  }
}

export class RequiredFieldError extends ClientError {
  constructor(message, cause) {
    super(message, 400, 'RequiredFieldError', cause)
  }
}

export class UnauthorizedError extends ClientError {
  constructor(message, cause) {
    super(message, 401, 'UnauthorizedError', cause)
  }
}

export class UnexpectedError extends Error {
  constructor(cause) {
    super('Unexpected error happend, please contact a responsible')
    this.type = 'UnexpectedError'
    this.status = 500
    this.cause = cause
  }
}
