import User from '../models/users.model.js'

export default {
  username: {
    isAlphanumeric: true,
    notEmpty: true,
    optional: false,
    isLength: { options: { min: 8 } },
    errorMessage: 'username should be string with at leaset 8 alphanumeric',
    custom: {
      options: async (value) => {
        const user = await User.findOne({username: value})
        if(user){
          throw new Error('username is already exist')
        }
      }
    }
  },
  password: {
    isStrongPassword: true,
    notEmpty: true,
    optional: false,
    isLength: { options: { min: 8, max: 32 } },
    errorMessage:
      'password should be string with at leaset 8 digits, it has at least 1 lowercase, 1 uppercase letter, and one symbol'
  },
  firstname: {
    isAlpha: true,
    notEmpty: true,
    optional: false,
    isLength: { options: { min: 3, max: 15 } },
    errorMessage:
      'firstname should be string with at leaset 8 and at most 15 alphapetic charachters'
  },
  lastname: {
    isAlpha: true,
    notEmpty: true,
    optional: false,
    isLength: { options: { min: 3, max: 15 } },
    errorMessage:
      'lastname should be string with at leaset 8 and at most 15 alphapetic charachters'
  },
  dob: {
    isDate: true,
    notEmpty: true,
    optional: true,
    errorMessage: 'date of birth should be valid date'
  },
  token: {
    customSanitizer: {
      options: (value, { req }) => {
        if (req.body.token) {
          Reflect.deleteProperty(req.body, 'token')
        }
      }
    }
  },
  todos: {
    customSanitizer: {
      options: (value, { req }) => {
        if (req.body.token) {
          Reflect.deleteProperty(req.body, 'token')
        }
      }
    }
  }
}
